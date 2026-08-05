import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * ============================================================
   * CREAR USUARIO
   * ============================================================
   *
   * La contraseña se cifra utilizando bcrypt.
   *
   * El hash se almacena en la base de datos,
   * pero nunca se devuelve mediante la API.
   * ============================================================
   */
  async create(createUserDto: CreateUserDto) {

    try {

      const passwordHash = await bcrypt.hash(
        createUserDto.password,
        10,
      );

      const usuario = await this.prisma.usuario.create({
        data: {
          ...createUserDto,
          password: passwordHash,
        },
      });

      const { password, ...usuarioSinPassword } = usuario;

      return usuarioSinPassword;

    } catch (error) {

      /**
       * Correo electrónico duplicado.
       */
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' &&
        Array.isArray(error.meta?.target) &&
        error.meta.target.includes('correo')
      ) {
        throw new ConflictException(
          'El correo electrónico ya está registrado.',
        );
      }

      throw error;
    }
  }

  /**
   * ============================================================
   * LISTAR USUARIOS
   * ============================================================
   *
   * La contraseña no se incluye en la respuesta.
   * ============================================================
   */
  findAll() {
    return this.prisma.usuario.findMany({
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

      orderBy: {
        id: 'asc',
      },
    });
  }

  /**
   * ============================================================
   * OBTENER USUARIO POR ID
   * ============================================================
   *
   * La contraseña no se incluye en la respuesta.
   * ============================================================
   */
  findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: {
        id,
      },

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
    });
  }

  /**
   * ============================================================
   * ACTUALIZAR USUARIO
   * ============================================================
   *
   * Si se modifica la contraseña,
   * se cifra nuevamente con bcrypt.
   *
   * La contraseña nunca se devuelve.
   * ============================================================
   */
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ) {

    const data: any = {
      ...updateUserDto,
    };

    /**
     * Si se envía una nueva contraseña,
     * se cifra antes de almacenarla.
     */
    if (updateUserDto.password) {

      data.password = await bcrypt.hash(
        updateUserDto.password,
        10,
      );
    }

    const usuario = await this.prisma.usuario.update({
      where: {
        id,
      },
      data,
    });

    const { password, ...usuarioSinPassword } = usuario;

    return usuarioSinPassword;
  }

    /**
   * ============================================================
   * ELIMINAR USUARIO
   * ============================================================
   *
   * No devuelve información sensible.
   * ============================================================
   */
  async remove(id: number) {

    await this.prisma.usuario.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Usuario eliminado correctamente.',
    };
  }

}