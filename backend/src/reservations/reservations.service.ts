import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createReservationDto: CreateReservationDto) {
    return this.prisma.reserva.create({
      data: createReservationDto,
    });
  }

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

  findOne(id: number) {
    return this.prisma.reserva.findUnique({
      where: { id },
      include: {
        usuario: true,
        propiedad: true,
      },
    });
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.prisma.reserva.update({
      where: { id },
      data: updateReservationDto,
    });
  }

  remove(id: number) {
    return this.prisma.reserva.delete({
      where: { id },
    });
  }
}