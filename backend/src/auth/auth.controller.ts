import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  /**
   * ============================================================
   * LOGIN
   * ============================================================
   *
   * Valida las credenciales del usuario.
   *
   * En esta etapa únicamente verificamos:
   *
   * - Correo
   * - Contraseña
   * - Usuario activo
   *
   * Todavía NO generamos el JWT.
   * ============================================================
   */
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ) {
    return this.authService.validarUsuario(
      loginDto.correo,
      loginDto.password,
    );
  }
}