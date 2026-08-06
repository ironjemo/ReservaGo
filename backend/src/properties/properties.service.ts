import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * ============================================================
   * CREAR PROPIEDAD
   * ============================================================
   *
   * El propietarioId viene del JWT y no del body.
   * ============================================================
   */
  create(
    createPropertyDto: CreatePropertyDto,
    propietarioId: number,
  ) {
    return this.prisma.propiedad.create({
      data: {
        ...createPropertyDto,
        propietarioId,
      },
    });
  }

  /**
   * ============================================================
   * LISTAR TODAS LAS PROPIEDADES
   * ============================================================
   *
   * El password del propietario nunca se devuelve.
   * ============================================================
   */
  findAll() {
    return this.prisma.propiedad.findMany({
      include: {
        propietario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
            telefono: true,
            whatsapp: true,
            rol: true,
            activo: true,
          },
        },
        municipio: true,
        tipoPropiedad: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  /**
   * ============================================================
   * OBTENER UNA PROPIEDAD
   * ============================================================
   */
  findOne(id: number) {
    return this.prisma.propiedad.findUnique({
      where: {
        id,
      },
      include: {
        propietario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
            telefono: true,
            whatsapp: true,
            rol: true,
            activo: true,
          },
        },
        municipio: true,
        tipoPropiedad: true,
      },
    });
  }

  /**
   * ============================================================
   * BUSCAR PROPIEDADES DISPONIBLES
   * ============================================================
   */
  async buscarDisponibles(
    fechaEntrada: Date,
    fechaSalida: Date,
    municipioId?: number,
    tipoPropiedadId?: number,
    capacidad?: number,
    precioMin?: number,
    precioMax?: number,
    aceptaMascotas?: boolean,
    piscina?: boolean,
    jacuzzi?: boolean,
    wifi?: boolean,
    parqueadero?: boolean,
    asador?: boolean,
    habitaciones?: number,
    banos?: number,
  ) {
    return this.prisma.propiedad.findMany({
      where: {
        /**
         * Solo propiedades activas.
         */
        estado: true,

        /**
         * Filtro por municipio.
         */
        ...(municipioId && {
          municipioId,
        }),

        /**
         * Filtro por tipo de propiedad.
         */
        ...(tipoPropiedadId && {
          tipoPropiedadId,
        }),

        /**
         * Capacidad mínima.
         */
        ...(capacidad && {
          capacidad: {
            gte: capacidad,
          },
        }),

        /**
         * Precio mínimo y máximo.
         */
        ...(precioMin || precioMax) && {
          precioNoche: {
            ...(precioMin && {
              gte: precioMin,
            }),
            ...(precioMax && {
              lte: precioMax,
            }),
          },
        },

        /**
         * Características.
         */
        ...(aceptaMascotas !== undefined && {
          aceptaMascotas,
        }),

        ...(piscina !== undefined && {
          piscina,
        }),

        ...(jacuzzi !== undefined && {
          jacuzzi,
        }),

        ...(wifi !== undefined && {
          wifi,
        }),

        ...(parqueadero !== undefined && {
          parqueadero,
        }),

        ...(asador !== undefined && {
          asador,
        }),

        /**
         * Habitaciones mínimas.
         */
        ...(habitaciones && {
          habitaciones: {
            gte: habitaciones,
          },
        }),

        /**
         * Baños mínimos.
         */
        ...(banos && {
          banos: {
            gte: banos,
          },
        }),

        /**
         * Excluir propiedades ocupadas
         * durante el rango solicitado.
         */
        reservas: {
          none: {
            fechaEntrada: {
              lte: fechaSalida,
            },
            fechaSalida: {
              gte: fechaEntrada,
            },
          },
        },
      },

      include: {
        propietario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
            telefono: true,
            whatsapp: true,
            rol: true,
            activo: true,
          },
        },
        municipio: true,
        tipoPropiedad: true,
      },

      orderBy: {
        id: 'asc',
      },
    });
  }

  /**
   * ============================================================
   * ACTUALIZAR PROPIEDAD
   * ============================================================
   *
   * Verifica primero que la propiedad pertenezca
   * al propietario autenticado.
   * ============================================================
   */
  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
    propietarioId: number,
  ) {
    const propiedad = await this.prisma.propiedad.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        propietarioId: true,
      },
    });

    if (!propiedad) {
      throw new NotFoundException(
        'La propiedad no existe.',
      );
    }

    if (propiedad.propietarioId !== propietarioId) {
      throw new ForbiddenException(
        'No tienes permiso para modificar esta propiedad.',
      );
    }

    return this.prisma.propiedad.update({
      where: {
        id,
      },
      data: updatePropertyDto,
    });
  }

  /**
   * ============================================================
   * ELIMINAR PROPIEDAD
   * ============================================================
   *
   * Verifica que la propiedad pertenezca al propietario
   * autenticado antes de eliminarla.
   * ============================================================
   */
  async remove(
    id: number,
    propietarioId: number,
  ) {
    const propiedad = await this.prisma.propiedad.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        propietarioId: true,
      },
    });

    if (!propiedad) {
      throw new NotFoundException(
        'La propiedad no existe.',
      );
    }

    if (propiedad.propietarioId !== propietarioId) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar esta propiedad.',
      );
    }

    return this.prisma.propiedad.delete({
      where: {
        id,
      },
    });
  }
}