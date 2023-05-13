import { Logger, Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PositionsController],
  providers: [
    PositionsService,
    PrismaService,
    {
      provide: Logger,
      useValue: new Logger('PositionsModule'),
    },
  ],
})
export class PositionsModule {}
