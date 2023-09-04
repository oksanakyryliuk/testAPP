import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe, Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Tests swagger: ')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);


  
  await app.listen(process.env.PORT, () => {
    try {
      Logger.verbose('Server is listening at port: ' + process.env.PORT);
      Logger.verbose(`Open server in web: localhost:${process.env.PORT}/`);
      Logger.warn(`Open SWAGGER in web: localhost:${process.env.PORT}/swagger`);
    }
    catch (e) {
      Logger.error(e);
    }
  })
}
bootstrap();
