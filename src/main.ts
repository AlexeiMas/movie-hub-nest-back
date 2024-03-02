import {NestFactory} from '@nestjs/core';
import {AppModule} from 'src/app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Movie hub')
    .setDescription('Movie hub API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('movie')
    .addTag('actor')
    .addTag('genre')
    .addTag('rating')
    .addTag('file')
    .addBearerAuth({type: 'http'})
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Swagger for movie hub',
  });

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 4200;

  await app.listen(PORT);
}

bootstrap().finally();
