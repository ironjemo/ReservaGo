import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * ============================================================
   * CREAR UNA NUEVA RESERVA
   * ============================================================
   */
  async create(createReservationDto: CreateReservationDto) {

    /**
     * ------------------------------------------------------------
     * 1. Buscar el usuario que realiza la reserva.
     * ------------------------------------------------------------
     */
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id: createReservationDto.usuarioId,
      },
    });

    /**
     * Si el usuario no existe,
     * detenemos el proceso.
     */
    if (!usuario) {
      throw new NotFoundException(
        'El usuario no existe.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 2. Validar que el usuario esté activo.
     * ------------------------------------------------------------
     */
    if (!usuario.activo) {
      throw new BadRequestException(
        'El usuario está inactivo.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 3. Buscar la propiedad.
     * ------------------------------------------------------------
     */
    const propiedad = await this.prisma.propiedad.findUnique({
      where: {
        id: createReservationDto.propiedadId,
      },
    });

    /**
     * Si la propiedad no existe,
     * cancelamos la creación de la reserva.
     */
    if (!propiedad) {
      throw new NotFoundException(
        'La propiedad no existe.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 4. Verificar que la propiedad esté activa.
     * ------------------------------------------------------------
     */
    if (!propiedad.estado) {
      throw new BadRequestException(
        'La propiedad está inactiva.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 4.1 Validar la capacidad máxima de la propiedad.
     * ------------------------------------------------------------
     */
    if (
      createReservationDto.cantidadPersonas >
      propiedad.capacidad
    ) {
      throw new BadRequestException(
        `La propiedad admite máximo ${propiedad.capacidad} personas.`,
      );
    }

    /**
     * ------------------------------------------------------------
     * 5. Verificar que NO exista otra reserva
     * para la misma propiedad en las fechas solicitadas.
     * ------------------------------------------------------------
     */
    const reservaExistente = await this.prisma.reserva.findFirst({
      where: {
        propiedadId: createReservationDto.propiedadId,

        fechaEntrada: {
          lte: createReservationDto.fechaSalida,
        },

        fechaSalida: {
          gte: createReservationDto.fechaEntrada,
        },
      },
    });

    /**
     * Si ya existe una reserva en esas fechas,
     * detenemos el proceso.
     */
    if (reservaExistente) {
      throw new BadRequestException(
        'La propiedad ya se encuentra reservada para esas fechas.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 6. Validar que la fecha de entrada
     * no sea anterior a la fecha actual.
     * ------------------------------------------------------------
     */
    const fechaEntrada = new Date(createReservationDto.fechaEntrada);
    const fechaSalida = new Date(createReservationDto.fechaSalida);

    // Fecha actual sin hora para comparar únicamente el día.
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // Fecha de entrada sin hora.
    fechaEntrada.setHours(0, 0, 0, 0);

    if (fechaEntrada < hoy) {
      throw new BadRequestException(
        'La fecha de entrada no puede ser anterior a la fecha actual.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 7. Calcular automáticamente el valor total.
     * ------------------------------------------------------------
     */

    const diferenciaTiempo =
      fechaSalida.getTime() - fechaEntrada.getTime();

    const cantidadNoches = Math.ceil(
      diferenciaTiempo / (1000 * 60 * 60 * 24),
    );

    /**
     * Validar que exista al menos una noche.
     */
    if (cantidadNoches <= 0) {
      throw new BadRequestException(
        'La fecha de salida debe ser posterior a la fecha de entrada.',
      );
    }

    /**
 * ------------------------------------------------------------
 * 7.1 Validar la duración máxima de la reserva.
 * ------------------------------------------------------------
 *
 * No permitimos reservas superiores a 30 noches.
 */
    if (cantidadNoches > 30) {
      throw new BadRequestException(
        'La estancia máxima permitida es de 30 noches.',
      );
    }

    /**
     * Precio por noche.
     */
    const precioNoche = Number(propiedad.precioNoche);

    /**
     * Valor total calculado automáticamente.
     */
    const valorTotal = precioNoche * cantidadNoches;

    /**
     * ------------------------------------------------------------
     * 8. Crear la reserva.
     * ------------------------------------------------------------
     */
    return this.prisma.reserva.create({
      data: {
        fechaEntrada: createReservationDto.fechaEntrada,
        fechaSalida: createReservationDto.fechaSalida,
        cantidadPersonas: createReservationDto.cantidadPersonas,
        estado: createReservationDto.estado,
        usuarioId: createReservationDto.usuarioId,
        propiedadId: createReservationDto.propiedadId,
        valorTotal,
      },

      include: {
        usuario: true,
        propiedad: true,
      },
    });
  }

  /**
   * ============================================================
   * LISTAR TODAS LAS RESERVAS
   * ============================================================
   */
  findAll() {
    return this.prisma.reserva.findMany({
      include: {
        usuario: true,
        propiedad: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  /**
   * ============================================================
   * OBTENER UNA RESERVA POR ID
   * ============================================================
   */
  findOne(id: number) {
    return this.prisma.reserva.findUnique({
      where: {
        id,
      },
      include: {
        usuario: true,
        propiedad: true,
      },
    });
  }

  /**
   * ============================================================
   * ACTUALIZAR UNA RESERVA
   * ============================================================
   */
  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.prisma.reserva.update({
      where: {
        id,
      },
      data: updateReservationDto,
    });
  }

  /**
   * ============================================================
   * ELIMINAR UNA RESERVA
   * ============================================================
   */
  remove(id: number) {
    return this.prisma.reserva.delete({
      where: {
        id,
      },
    });
  }
}