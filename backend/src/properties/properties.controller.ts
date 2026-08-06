import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
  ) {}

  /**
   * ============================================================
   * CREAR PROPIEDAD
   * ============================================================
   *
   * Solo un usuario autenticado con rol PROPIETARIO
   * puede crear una propiedad.
   *
   * El propietarioId se obtiene directamente desde el JWT.
   * No se recibe desde el body.
   * ============================================================
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROPIETARIO')
  @Post()
  create(
    @Body() createPropertyDto: CreatePropertyDto,
    @Req() req: any,
  ) {
    return this.propertiesService.create(
      createPropertyDto,
      req.user.id,
    );
  }

  /**
   * ============================================================
   * LISTAR TODAS LAS PROPIEDADES
   * ============================================================
   */
  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  /**
   * ============================================================
   * BUSCAR PROPIEDADES DISPONIBLES
   * ============================================================
   */
  @Get('disponibles')
  buscarDisponibles(
    @Query('entrada') entrada: string,
    @Query('salida') salida: string,

    @Query('municipioId') municipioId?: string,
    @Query('tipoPropiedadId') tipoPropiedadId?: string,
    @Query('capacidad') capacidad?: string,

    @Query('precioMin') precioMin?: string,
    @Query('precioMax') precioMax?: string,

    @Query('aceptaMascotas') aceptaMascotas?: string,
    @Query('piscina') piscina?: string,
    @Query('jacuzzi') jacuzzi?: string,
    @Query('wifi') wifi?: string,
    @Query('parqueadero') parqueadero?: string,
    @Query('asador') asador?: string,
    @Query('habitaciones') habitaciones?: string,
    @Query('banos') banos?: string,
  ) {
    return this.propertiesService.buscarDisponibles(
      new Date(entrada),
      new Date(salida),

      municipioId
        ? Number(municipioId)
        : undefined,

      tipoPropiedadId
        ? Number(tipoPropiedadId)
        : undefined,

      capacidad
        ? Number(capacidad)
        : undefined,

      precioMin
        ? Number(precioMin)
        : undefined,

      precioMax
        ? Number(precioMax)
        : undefined,

      aceptaMascotas !== undefined
        ? aceptaMascotas === 'true'
        : undefined,

      piscina !== undefined
        ? piscina === 'true'
        : undefined,

      jacuzzi !== undefined
        ? jacuzzi === 'true'
        : undefined,

      wifi !== undefined
        ? wifi === 'true'
        : undefined,

      parqueadero !== undefined
        ? parqueadero === 'true'
        : undefined,

      asador !== undefined
        ? asador === 'true'
        : undefined,

      habitaciones
        ? Number(habitaciones)
        : undefined,

      banos
        ? Number(banos)
        : undefined,
    );
  }

  /**
   * ============================================================
   * OBTENER UNA PROPIEDAD POR ID
   * ============================================================
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(Number(id));
  }

  /**
   * ============================================================
   * ACTUALIZAR PROPIEDAD
   * ============================================================
   *
   * Solo un PROPIETARIO autenticado puede actualizar
   * una propiedad que le pertenece.
   * ============================================================
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROPIETARIO')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @Req() req: any,
  ) {
    return this.propertiesService.update(
      Number(id),
      updatePropertyDto,
      req.user.id,
    );
  }

  /**
   * ============================================================
   * ELIMINAR PROPIEDAD
   * ============================================================
   *
   * Solo un PROPIETARIO autenticado puede eliminar
   * una propiedad que le pertenece.
   * ============================================================
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROPIETARIO')
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return this.propertiesService.remove(
      Number(id),
      req.user.id,
    );
  }
}