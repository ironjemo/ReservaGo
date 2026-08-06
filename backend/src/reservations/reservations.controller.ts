import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
  ) {}

  /**
   * ============================================================
   * CREAR RESERVA
   * ============================================================
   *
   * Requiere autenticación mediante JWT.
   *
   * El usuarioId NO viene desde el frontend/Postman.
   * Se obtiene directamente del usuario autenticado:
   *
   * req.user.id
   * ============================================================
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createReservationDto: CreateReservationDto,
    @Req() req: any,
  ) {
    return this.reservationsService.create(
      createReservationDto,
      req.user.id,
    );
  }

  /**
   * ============================================================
   * LISTAR TODAS LAS RESERVAS
   * ============================================================
   */
  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  /**
   * ============================================================
   * OBTENER RESERVA POR ID
   * ============================================================
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  /**
   * ============================================================
   * ACTUALIZAR RESERVA
   * ============================================================
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(
      +id,
      updateReservationDto,
    );
  }

  /**
   * ============================================================
   * ELIMINAR RESERVA
   * ============================================================
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}