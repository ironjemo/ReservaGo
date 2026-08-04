import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
   * Solo los usuarios con rol PROPIETARIO
   * pueden registrar nuevas propiedades.
   * ============================================================
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROPIETARIO')
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
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
   *
   * Permite buscar propiedades disponibles utilizando filtros
   * opcionales.
   *
   * Filtros disponibles:
   *
   * - municipioId
   * - tipoPropiedadId
   * - capacidad
   * - precioMin
   * - precioMax
   * - aceptaMascotas
   * - piscina
   * - jacuzzi
   * - wifi
   * - parqueadero
   * - asador
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
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(
      Number(id),
      updatePropertyDto,
    );
  }

  /**
   * ============================================================
   * ELIMINAR PROPIEDAD
   * ============================================================
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(Number(id));
  }
}