import { join } from 'path';
import helmet from 'helmet';
import {
  INestApplication,
  Module,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { loadConfiguration } from './config';
import { TodosModule } from './todos';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(config: ConfigService) {
        return {
          type: 'postgres',
          host: config.get<string>('database.url'),
          port: config.get<number>('database.port'),
          database: config.get<string>('database.database'),
          username: config.get<string>('database.user'),
          password: config.get<string>('database.password'),
          entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
          synchronize: config.get<boolean>('database.synchronize'),
        };
      },
    }),
    TodosModule,
    ConfigModule,
  ],
})
export class AppModule {
  static async setup(app: INestApplication) {
    app.use(helmet());
    app.enableCors();
    app.enableVersioning({
      type: VersioningType.URI,
    });
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    const swagger = new DocumentBuilder()
      .setTitle('Todos')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, swagger);
    SwaggerModule.setup('documentation', app, document);
  }
}
