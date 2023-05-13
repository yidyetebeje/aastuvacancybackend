import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { SwaggerModule } from '@nestjs/swagger';
import { FileuploadModule } from './fileupload/fileupload.module';
import { PositionsModule } from './positions/positions.module';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    VacanciesModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    FileuploadModule,
    PositionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: Logger,
      useValue: new Logger('AuthModule'),
    },
  ],
})
export class AppModule {}
