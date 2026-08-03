import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      /**
       * Extraer el token del encabezado:
       *
       * Authorization: Bearer <token>
       */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      /**
       * No ignorar expiración.
       */
      ignoreExpiration: false,

      /**
       * Debe coincidir con el secret configurado
       * en JwtModule.
       */
      secretOrKey: 'reservago-jwt-secret',
    });
  }

  /**
   * ============================================================
   * VALIDAR TOKEN
   * ============================================================
   *
   * Este método se ejecuta automáticamente
   * cuando el JWT es válido.
   * ============================================================
   */
  async validate(payload: any) {
    return {
      id: payload.sub,
      correo: payload.correo,
      rol: payload.rol,
    };
  }
}