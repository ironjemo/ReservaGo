export class CreateReservationDto {
  fechaEntrada!: Date;

  fechaSalida!: Date;

  cantidadPersonas!: number;

  valorTotal!: number;

  estado?: string;

  usuarioId!: number;

  propiedadId!: number;
}