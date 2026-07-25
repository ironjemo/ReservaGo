import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  create(createPropertyDto: CreatePropertyDto) {
    return this.prisma.propiedad.create({
      data: createPropertyDto,
    });
  }

  findAll() {
    return this.prisma.propiedad.findMany({
      include: {
        propietario: true,
        municipio: true,
        tipoPropiedad: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.propiedad.findUnique({
      where: { id },
      include: {
        propietario: true,
        municipio: true,
        tipoPropiedad: true,
      },
    });
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return this.prisma.propiedad.update({
      where: { id },
      data: updatePropertyDto,
    });
  }

  remove(id: number) {
    return this.prisma.propiedad.delete({
      where: { id },
    });
  }
}