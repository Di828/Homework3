import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  await app.listen(PORT, () => {
    console.log(`Server start listen at port ${PORT}`);
  });
}

bootstrap();
