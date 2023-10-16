import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json({limit: '100mb'}));
  app.enableCors();

        
  const config = new DocumentBuilder()
    .setTitle('Organization Register')
    .setDescription('Welcome')
    .setVersion('1.0')
    .addTag('Api')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
 
  await app.listen(3000);
}
bootstrap();
