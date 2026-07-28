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
  constructor(private readonly prisma: PrismaService) {}

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
     * 5. Verificar que NO exista otra reserva
     * para la misma propiedad en las fechas solicitadas.
     *
     * Una reserva se cruza cuando:
     *
     * Reserva existente:
     * |---------|
     *
     * Nueva reserva:
     *      |---------|
     *
     * o cualquier otra superposición.
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
     * 6. Crear la reserva.
     * ------------------------------------------------------------
     */
    return this.prisma.reserva.create({
      data: createReservationDto,
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