import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,{
      transport: Transport.TCP,
      options:{
        host: '0.0.0.0',
        port: envs.port
      }
    }
  );
  console.log("Port2",envs.port);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidUnknownValues: true,
    })
  )
  
  await app.listen();
}
bootstrap();
