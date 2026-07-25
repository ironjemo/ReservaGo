export class CreateUserDto {
  nombre!: string;
  apellido!: string;
  correo!: string;
  telefono!: string;
  password!: string;
  whatsapp?: string;
  rol?: 'ADMIN' | 'PROPIETARIO' | 'CLIENTE';
}