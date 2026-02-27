import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  await app.listen(process.env.PORT || 4000);  // ← must use process.env.PORT
  console.log('🚀 Backend running');
}
bootstrap();
