import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1', {
    exclude: [
      { path: '', method: RequestMethod.GET },
      { path: 'panels', method: RequestMethod.GET },
      { path: 'panels/:slug', method: RequestMethod.GET },
    ],
  });
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.API_PORT ? Number(process.env.API_PORT) : 3000);
}

void bootstrap();
