import { ApiProperty } from '@nestjs/swagger';
import { RESEARCH_EXPERIENCE_TYPE } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly level: 'LOW' | 'MIDDLE';
  @ApiProperty()
  academicRank: string;
  @ApiProperty()
  readonly teachingExperience: number;
  @ApiProperty()
  readonly workExperience: number;
  @ApiProperty()
  readonly KPI: number;
  @ApiProperty()
  readonly communityService: boolean;
  @ApiProperty()
  readonly leadershipExperience: number;
  @ApiProperty()
  readonly researchExperience: RESEARCH_EXPERIENCE_TYPE;
  @ApiProperty()
  readonly strategicPlan: boolean;
}
