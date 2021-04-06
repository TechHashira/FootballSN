import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();

  useContainer(app.select(AppModule), {
    fallback: true,
    fallbackOnErrors: true,
  });
  const config = new DocumentBuilder()
    .setTitle('football social network')
    .setVersion('1.0')
    .addTag('football')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();
