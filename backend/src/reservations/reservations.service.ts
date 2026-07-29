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
     * 4.1 Validar que el propietario no reserve
     * su propia propiedad.
     * ------------------------------------------------------------
     */
    if (usuario.id === propiedad.propietarioId) {
      throw new BadRequestException(
        'El propietario no puede reservar su propia propiedad.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 4.2 Validar cantidad de personas.
     * ------------------------------------------------------------
     */
    if (createReservationDto.cantidadPersonas <= 0) {
      throw new BadRequestException(
        'La cantidad de personas debe ser mayor que cero.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 4.3 Validar capacidad máxima.
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
     * 5. Validar reservas cruzadas.
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

    if (reservaExistente) {
      throw new BadRequestException(
        'La propiedad ya se encuentra reservada para esas fechas.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 6. Validar fechas.
     * ------------------------------------------------------------
     */
    const fechaEntrada = new Date(createReservationDto.fechaEntrada);
    const fechaSalida = new Date(createReservationDto.fechaSalida);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    fechaEntrada.setHours(0, 0, 0, 0);

    if (fechaEntrada < hoy) {
      throw new BadRequestException(
        'La fecha de entrada no puede ser anterior a la fecha actual.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 7. Calcular noches.
     * ------------------------------------------------------------
     */
    const diferenciaTiempo =
      fechaSalida.getTime() - fechaEntrada.getTime();

    const cantidadNoches = Math.ceil(
      diferenciaTiempo / (1000 * 60 * 60 * 24),
    );

    if (cantidadNoches <= 0) {
      throw new BadRequestException(
        'La fecha de salida debe ser posterior a la fecha de entrada.',
      );
    }

    if (cantidadNoches > 30) {
      throw new BadRequestException(
        'La estancia máxima permitida es de 30 noches.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 8. Calcular valor total.
     * ------------------------------------------------------------
     */
    const precioNoche = Number(propiedad.precioNoche);
    const valorTotal = precioNoche * cantidadNoches;

    /**
     * ------------------------------------------------------------
     * 9. Crear reserva.
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
  async update(
    id: number,
    updateReservationDto: UpdateReservationDto,
  ) {

    /**
     * ------------------------------------------------------------
     * 1. Buscar la reserva.
     * ------------------------------------------------------------
     */
    const reserva = await this.prisma.reserva.findUnique({
      where: {
        id,
      },
    });

    if (!reserva) {
      throw new NotFoundException(
        'La reserva no existe.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 2. Buscar la propiedad asociada.
     * ------------------------------------------------------------
     */
    const propiedad = await this.prisma.propiedad.findUnique({
      where: {
        id: reserva.propiedadId,
      },
    });

    if (!propiedad) {
      throw new NotFoundException(
        'La propiedad asociada a la reserva no existe.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 3. Validar cantidad de personas.
     * ------------------------------------------------------------
     */
    if (updateReservationDto.cantidadPersonas !== undefined) {

      if (updateReservationDto.cantidadPersonas <= 0) {
        throw new BadRequestException(
          'La cantidad de personas debe ser mayor que cero.',
        );
      }

      if (
        updateReservationDto.cantidadPersonas >
        propiedad.capacidad
      ) {
        throw new BadRequestException(
          `La propiedad admite máximo ${propiedad.capacidad} personas.`,
        );
      }
    }

    /**
     * ------------------------------------------------------------
     * 4. Obtener las fechas que realmente tendrá la reserva.
     * ------------------------------------------------------------
     */
    const fechaEntrada = updateReservationDto.fechaEntrada
      ? new Date(updateReservationDto.fechaEntrada)
      : new Date(reserva.fechaEntrada);

    const fechaSalida = updateReservationDto.fechaSalida
      ? new Date(updateReservationDto.fechaSalida)
      : new Date(reserva.fechaSalida);

    /**
     * ------------------------------------------------------------
     * 5. Validar rango de fechas.
     * ------------------------------------------------------------
     */
    if (fechaSalida <= fechaEntrada) {
      throw new BadRequestException(
        'La fecha de salida debe ser posterior a la fecha de entrada.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 6. Verificar reservas cruzadas.
     *
     * IMPORTANTE:
     * Excluimos la misma reserva para evitar
     * que choque consigo misma.
     * ------------------------------------------------------------
     */
    const reservaExistente = await this.prisma.reserva.findFirst({
      where: {

        propiedadId: reserva.propiedadId,

        id: {
          not: id,
        },

        fechaEntrada: {
          lte: fechaSalida,
        },

        fechaSalida: {
          gte: fechaEntrada,
        },
      },
    });

    if (reservaExistente) {
      throw new BadRequestException(
        'La propiedad ya se encuentra reservada para esas fechas.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 7. Calcular noches.
     * ------------------------------------------------------------
     */
    const diferenciaTiempo =
      fechaSalida.getTime() - fechaEntrada.getTime();

    const cantidadNoches = Math.ceil(
      diferenciaTiempo / (1000 * 60 * 60 * 24),
    );

    if (cantidadNoches <= 0) {
      throw new BadRequestException(
        'La fecha de salida debe ser posterior a la fecha de entrada.',
      );
    }

    if (cantidadNoches > 30) {
      throw new BadRequestException(
        'La estancia máxima permitida es de 30 noches.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 8. Recalcular automáticamente el valor total.
     * ------------------------------------------------------------
     */
    const valorTotal =
      Number(propiedad.precioNoche) * cantidadNoches;

    /**
     * ------------------------------------------------------------
     * 9. Actualizar la reserva.
     * ------------------------------------------------------------
     */
    return this.prisma.reserva.update({

      where: {
        id,
      },

      data: {

        ...updateReservationDto,

        fechaEntrada,

        fechaSalida,

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