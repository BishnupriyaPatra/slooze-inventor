import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for production
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://your-frontend-name.vercel.app', // replace after deployment
    ],
  });

  const port = process.env.PORT || 4000; // IMPORTANT
  await app.listen(port);

  console.log(`🚀 Backend running on port ${port}`);
}
bootstrap();
