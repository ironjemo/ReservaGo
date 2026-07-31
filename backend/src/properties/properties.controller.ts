import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
  ) { }

  /**
   * ============================================================
   * CREAR PROPIEDAD
   * ============================================================
   */
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
 * Ejemplos:
 *
 * GET /properties/disponibles
 * ?entrada=2026-12-20
 * &salida=2026-12-22
 *
 * GET /properties/disponibles
 * ?entrada=2026-12-20
 * &salida=2026-12-22
 * &municipioId=2
 *
 * GET /properties/disponibles
 * ?entrada=2026-12-20
 * &salida=2026-12-22
 * &municipioId=2
 * &tipoPropiedadId=3
 * &capacidad=8
 *
 * Todos los filtros son opcionales,
 * excepto las fechas.
 * ============================================================
 */
  @Get('disponibles')
  buscarDisponibles(
    @Query('entrada') entrada: string,
    @Query('salida') salida: string,
    @Query('municipioId') municipioId?: string,
    @Query('tipoPropiedadId') tipoPropiedadId?: string,
    @Query('capacidad') capacidad?: string,
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