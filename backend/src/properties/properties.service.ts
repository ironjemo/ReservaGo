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
 * Retorna únicamente las propiedades activas que NO tengan
 * reservas que se crucen con el rango de fechas solicitado.
 *
 * Una propiedad estará disponible cuando:
 *
 * - Esté activa.
 * - No tenga reservas cuya fecha de entrada sea menor o igual
 *   a la fecha de salida buscada.
 * - No tenga reservas cuya fecha de salida sea mayor o igual
 *   a la fecha de entrada buscada.
 * ============================================================
 */
  async buscarDisponibles(
    fechaEntrada: Date,
    fechaSalida: Date,
  ) {

    return this.prisma.propiedad.findMany({

      /**
       * Solamente propiedades activas.
       */
      where: {

        estado: true,

        /**
         * Ninguna reserva debe cruzarse
         * con el rango solicitado.
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