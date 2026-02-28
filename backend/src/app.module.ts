import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // 🔽 yeh naya part hai
      csrfPrevention: false,      // ab browser se direct call pe CSRF block nahi karega
      introspection: true,        // tools / playground ke liye
      playground: true,           // /graphql pe UI (optional but helpful)
      context: ({ req }) => ({ req }),
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
})
export class AppModule {}