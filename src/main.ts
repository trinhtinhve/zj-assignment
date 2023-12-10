import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { PrismaService } from './prisma/prisma.service';
import { setupSwagger } from './utils/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const prismaService = app.get(PrismaService);
  const configService = app.get(ConfigService);

  await prismaService.enableShutdownHooks(app);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
    }),
  );

  if (configService.get('NODE_ENV') !== 'prod') {
    setupSwagger(app);
  }

  await app.listen(configService.get('PORT', 3000));
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
