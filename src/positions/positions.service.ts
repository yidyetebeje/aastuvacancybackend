import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PositionsService {
  constructor(private readonly prismService: PrismaService) {}
  async create(createPositionDto: CreatePositionDto) {
    const requirement = await this.prismService.requirements.create({
      data: {
        academicRank: createPositionDto.academicRank,
        leadershipExperience: createPositionDto.leadershipExperience,
        teachingExperience: createPositionDto.teachingExperience,
        researchExperience: createPositionDto.researchExperience,
        communityService: createPositionDto.communityService,
        workExperience: createPositionDto.workExperience,
        KPI: createPositionDto.KPI,
      },
    });
    return this.prismService.position.create({
      data: {
        name: createPositionDto.name,
        description: createPositionDto.description,
        level: createPositionDto.level,
        requirementsId: requirement.id ? requirement.id : '0',
      },
    });
  }

  async findAll() {
    const positions = await this.prismService.position.findMany({
      include: {
        requirements: true,
      },
    });
    return positions;
  }

  findOne(id: string) {
    const position = this.prismService.position.findUnique({
      where: {
        id: id,
      },
      include: {
        requirements: true,
      },
    });
    return position;
  }

  update(id: number, updatePositionDto: UpdatePositionDto) {
    return `This action updates a #${id} position`;
  }

  remove(id: string) {
    const position = this.prismService.position.delete({
      where: {
        id: id,
      },
    });
    return position;
  }
}
