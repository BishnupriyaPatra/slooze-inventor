import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      process.env.FRONTEND_URL || '',
    ].filter(Boolean),
    credentials: true,
  });

  const port = process.env.PORT || 4000;
  await app.listen(port as number, '0.0.0.0');
  console.log(`🚀 Backend running on port ${port}`);
}
bootstrap();