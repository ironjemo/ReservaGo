import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { EstadoReserva } from '@prisma/client';

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
   *
   * El usuario autenticado se recibe mediante usuarioId.
   *
   * El usuarioId NO proviene del DTO.
   *
   * Los valores financieros son calculados automáticamente.
   * ============================================================
   */
  async create(
    createReservationDto: CreateReservationDto,
    usuarioId: number,
  ) {
    /**
     * ------------------------------------------------------------
     * 1. Buscar el usuario autenticado.
     * ------------------------------------------------------------
     */
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id: usuarioId,
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
     * 5. Convertir y validar fechas.
     * ------------------------------------------------------------
     */
    const fechaEntrada = new Date(
      createReservationDto.fechaEntrada,
    );

    const fechaSalida = new Date(
      createReservationDto.fechaSalida,
    );

    /**
     * ------------------------------------------------------------
     * 5.1 Validar fecha de entrada.
     * ------------------------------------------------------------
     */
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaEntradaValidacion = new Date(
      fechaEntrada,
    );

    fechaEntradaValidacion.setHours(
      0,
      0,
      0,
      0,
    );

    if (fechaEntradaValidacion < hoy) {
      throw new BadRequestException(
        'La fecha de entrada no puede ser anterior a la fecha actual.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 5.2 Validar rango de fechas.
     * ------------------------------------------------------------
     */
    if (fechaSalida <= fechaEntrada) {
      throw new BadRequestException(
        'La fecha de salida debe ser posterior a la fecha de entrada.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 6. Validar reservas cruzadas.
     * ------------------------------------------------------------
     */
    const reservaExistente =
      await this.prisma.reserva.findFirst({
        where: {
          propiedadId:
            createReservationDto.propiedadId,

          fechaEntrada: {
            lt: fechaSalida,
          },

          fechaSalida: {
            gt: fechaEntrada,
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
      fechaSalida.getTime() -
      fechaEntrada.getTime();

    const cantidadNoches = Math.ceil(
      diferenciaTiempo /
        (1000 * 60 * 60 * 24),
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
     * 8. Calcular valores financieros.
     *
     * precioNoche = precio actual de la propiedad
     * subtotal    = precioNoche × cantidadNoches
     * comision    = 10 % del subtotal
     * valorTotal  = subtotal
     * ------------------------------------------------------------
     */
    const precioNoche = Number(
      propiedad.precioNoche,
    );

    const subtotal =
      precioNoche * cantidadNoches;

    const comision =
      subtotal * 0.10;

    const valorTotal =
      subtotal;

    /**
     * ------------------------------------------------------------
     * 9. Crear reserva.
     *
     * El estado inicial siempre será PENDIENTE.
     * El usuario se obtiene desde el JWT.
     * ------------------------------------------------------------
     */
    return this.prisma.reserva.create({
      data: {
        fechaEntrada,

        fechaSalida,

        cantidadPersonas:
          createReservationDto.cantidadPersonas,

        cantidadNoches,

        precioNoche,

        subtotal,

        comision,

        valorTotal,

        estado:
          EstadoReserva.PENDIENTE,

        usuarioId,

        propiedadId:
          createReservationDto.propiedadId,
      },

      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
            telefono: true,
            whatsapp: true,
            rol: true,
            activo: true,
            createdAt: true,
            updatedAt: true,
          },
        },

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
        usuario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
            telefono: true,
            whatsapp: true,
            rol: true,
            activo: true,
            createdAt: true,
            updatedAt: true,
          },
        },

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
        usuario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
            telefono: true,
            whatsapp: true,
            rol: true,
            activo: true,
            createdAt: true,
            updatedAt: true,
          },
        },

        propiedad: true,
      },
    });
  }

  /**
   * ============================================================
   * ACTUALIZAR UNA RESERVA
   * ============================================================
   *
   * El PATCH solamente permite modificar:
   *
   * - fechaEntrada
   * - fechaSalida
   * - cantidadPersonas
   *
   * NO permite modificar:
   *
   * - usuarioId
   * - propiedadId
   * - estado
   * - precioNoche
   * - subtotal
   * - comision
   * - valorTotal
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
    const reserva =
      await this.prisma.reserva.findUnique({
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
    const propiedad =
      await this.prisma.propiedad.findUnique({
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
    const cantidadPersonas =
      updateReservationDto.cantidadPersonas ??
      reserva.cantidadPersonas;

    if (cantidadPersonas <= 0) {
      throw new BadRequestException(
        'La cantidad de personas debe ser mayor que cero.',
      );
    }

    if (
      cantidadPersonas >
      propiedad.capacidad
    ) {
      throw new BadRequestException(
        `La propiedad admite máximo ${propiedad.capacidad} personas.`,
      );
    }

    /**
     * ------------------------------------------------------------
     * 4. Obtener las fechas que realmente tendrá
     * la reserva.
     * ------------------------------------------------------------
     */
    const fechaEntrada =
      updateReservationDto.fechaEntrada
        ? new Date(
            updateReservationDto.fechaEntrada,
          )
        : new Date(
            reserva.fechaEntrada,
          );

    const fechaSalida =
      updateReservationDto.fechaSalida
        ? new Date(
            updateReservationDto.fechaSalida,
          )
        : new Date(
            reserva.fechaSalida,
          );

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
     * 6. Validar que la nueva fecha de entrada
     * no sea anterior al día actual.
     * ------------------------------------------------------------
     */
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaEntradaValidacion =
      new Date(fechaEntrada);

    fechaEntradaValidacion.setHours(
      0,
      0,
      0,
      0,
    );

    if (fechaEntradaValidacion < hoy) {
      throw new BadRequestException(
        'La fecha de entrada no puede ser anterior a la fecha actual.',
      );
    }

    /**
     * ------------------------------------------------------------
     * 7. Verificar reservas cruzadas.
     *
     * Excluimos la misma reserva.
     * ------------------------------------------------------------
     */
    const reservaExistente =
      await this.prisma.reserva.findFirst({
        where: {
          propiedadId:
            reserva.propiedadId,

          id: {
            not: id,
          },

          fechaEntrada: {
            lt: fechaSalida,
          },

          fechaSalida: {
            gt: fechaEntrada,
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
     * 8. Calcular noches.
     * ------------------------------------------------------------
     */
    const diferenciaTiempo =
      fechaSalida.getTime() -
      fechaEntrada.getTime();

    const cantidadNoches =
      Math.ceil(
        diferenciaTiempo /
          (1000 * 60 * 60 * 24),
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
     * 9. Mantener el precio histórico de la reserva.
     *
     * No usamos el precio actual de la propiedad.
     * De esta manera una modificación de fechas no cambia
     * arbitrariamente el precio pactado de la reserva.
     * ------------------------------------------------------------
     */
    const precioNoche =
      Number(reserva.precioNoche);

    const subtotal =
      precioNoche * cantidadNoches;

    const comision =
      subtotal * 0.10;

    const valorTotal =
      subtotal;

    /**
     * ------------------------------------------------------------
     * 10. Actualizar únicamente los campos permitidos.
     *
     * El estado actual se conserva.
     * ------------------------------------------------------------
     */
    return this.prisma.reserva.update({
      where: {
        id,
      },

      data: {
        fechaEntrada,

        fechaSalida,

        cantidadPersonas,

        cantidadNoches,

        precioNoche,

        subtotal,

        comision,

        valorTotal,

        estado:
          reserva.estado,
      },

      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
            telefono: true,
            whatsapp: true,
            rol: true,
            activo: true,
            createdAt: true,
            updatedAt: true,
          },
        },

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