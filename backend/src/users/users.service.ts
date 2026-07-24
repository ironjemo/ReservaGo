import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
  return this.prisma.usuario.create({
    data: {
      nombre: createUserDto.nombre,
      apellido: createUserDto.apellido,
      correo: createUserDto.correo,
      telefono: createUserDto.telefono,
      password: createUserDto.password,
      whatsapp: createUserDto.whatsapp,
    },
  });
}

  findAll() {
  return this.prisma.usuario.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}

  findOne(id: number) {
  return this.prisma.usuario.findUnique({
    where: {
      id,
    },
  });
}

  update(id: number, updateUserDto: UpdateUserDto) {
  return this.prisma.usuario.update({
    where: {
      id,
    },
    data: updateUserDto,
  });
}

  remove(id: number) {
  return this.prisma.usuario.delete({
    where: {
      id,
    },
  });
}

}