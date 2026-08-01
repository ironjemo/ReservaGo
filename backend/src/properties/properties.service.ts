import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) { }

  create(createPropertyDto: CreatePropertyDto) {
    return this.prisma.propiedad.create({
      data: createPropertyDto,
    });
  }

  findAll() {
    return this.prisma.propiedad.findMany({
      include: {
        propietario: true,
        municipio: true,
        tipoPropiedad: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.propiedad.findUnique({
      where: { id },
      include: {
        propietario: true,
        municipio: true,
        tipoPropiedad: true,
      },
    });
  }

  /**
 * ============================================================
 * BUSCAR PROPIEDADES DISPONIBLES
 * ============================================================
 *
 * Permite buscar propiedades disponibles aplicando filtros
 * opcionales como:
 *
 * - Municipio
 * - Tipo de propiedad
 * - Capacidad
 * - Precio mínimo
 * - Precio máximo
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
  ) {

    return this.prisma.propiedad.findMany({

      where: {

        /**
         * Solo propiedades activas.
         */
        estado: true,

        /**
         * Aplicar filtros únicamente
         * cuando el usuario los envíe.
         */
        ...(municipioId && {
          municipioId,
        }),

        ...(tipoPropiedadId && {
          tipoPropiedadId,
        }),

        /**
 * ------------------------------------------------------------
 * Capacidad mínima requerida.
 * ------------------------------------------------------------
 */
        ...(capacidad && {
          capacidad: {
            gte: capacidad,
          },
        }),

        /**
         * ------------------------------------------------------------
         * Precio mínimo por noche.
         * ------------------------------------------------------------
         */
        ...(precioMin && {
          precioNoche: {
            gte: precioMin,
          },
        }),

        /**
         * ------------------------------------------------------------
         * Precio máximo por noche.
         * ------------------------------------------------------------
         */
        ...(precioMax && {
          precioNoche: {
            ...(precioMin && {
              gte: precioMin,
            }),
            lte: precioMax,
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

      /**
       * Retornamos información relacionada.
       */
      include: {

        propietario: true,

        municipio: true,

        tipoPropiedad: true,

      },

      /**
       * Ordenar por ID.
       */
      orderBy: {

        id: 'asc',

      },

    });

  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return this.prisma.propiedad.update({
      where: { id },
      data: updatePropertyDto,
    });
  }

  remove(id: number) {
    return this.prisma.propiedad.delete({
      where: { id },
    });
  }
}