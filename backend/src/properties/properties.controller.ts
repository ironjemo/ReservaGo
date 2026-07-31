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
  ) {}

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
   * Ejemplo:
   *
   * GET /properties/disponibles
   *      ?entrada=2026-12-10
   *      &salida=2026-12-15
   * ============================================================
   */
  @Get('disponibles')
  buscarDisponibles(
    @Query('entrada') entrada: string,
    @Query('salida') salida: string,
  ) {
    return this.propertiesService.buscarDisponibles(
      new Date(entrada),
      new Date(salida),
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