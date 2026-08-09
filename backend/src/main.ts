import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * ============================================================
   * CORS
   * ============================================================
   *
   * Permite que el frontend Next.js pueda comunicarse
   * con la API NestJS durante el desarrollo local.
   * ============================================================
   */
  app.enableCors({
    origin: 'http://localhost:3001',
  });

  /**
   * ============================================================
   * PUERTO DEL BACKEND
   * ============================================================
   */
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
