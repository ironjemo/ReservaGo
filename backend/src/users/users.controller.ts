import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  /**
   * ============================================================
   * CREAR USUARIO
   * ============================================================
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * ============================================================
   * LISTAR TODOS LOS USUARIOS
   * ============================================================
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * ============================================================
   * OBTENER PERFIL DEL USUARIO AUTENTICADO
   * ============================================================
   *
   * Requiere un JWT válido.
   *
   * El JwtStrategy coloca en req.user:
   *
   * {
   *   id,
   *   correo,
   *   rol
   * }
   *
   * Utilizamos el id del usuario autenticado para consultar
   * su información.
   * ============================================================
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: any) {
    return this.usersService.findOne(req.user.id);
  }

  /**
   * ============================================================
   * OBTENER USUARIO POR ID
   * ============================================================
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  /**
   * ============================================================
   * ACTUALIZAR USUARIO
   * ============================================================
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(
      Number(id),
      updateUserDto,
    );
  }

  /**
   * ============================================================
   * ELIMINAR USUARIO
   * ============================================================
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}