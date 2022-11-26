import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { ProductsModule } from './products/products.module';
import { ProductEntity } from './products/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: new ConfigService().get('DATABASE_HOST'),
      port: new ConfigService().get('DATABASE_PORT'),
      username: new ConfigService().get('DATABASE_USER'),
      password: new ConfigService().get('DATABASE_PASSWORD'),
      database: new ConfigService().get('DATABASE_NAME'),
      entities: [UserEntity, ProductEntity],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
