export class CreatePropertyDto {
  nombre!: string;
  descripcion!: string;
  direccion?: string;

  precioNoche!: number;
  capacidad!: number;
  habitaciones!: number;
  banos!: number;

  aceptaMascotas?: boolean;
  piscina?: boolean;
  jacuzzi?: boolean;
  wifi?: boolean;
  parqueadero?: boolean;
  asador?: boolean;

  propietarioId!: number;
  municipioId!: number;
  tipoPropiedadId!: number;
}