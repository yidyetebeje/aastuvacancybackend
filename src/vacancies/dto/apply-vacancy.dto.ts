import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyVacancyDto {
  @ApiProperty({ description: 'The academic rank of the applicant' })
  @IsNotEmpty()
  academicRank: string;

  @ApiProperty({ description: 'The research experience of the applicant' })
  @IsNotEmpty()
  researchExperience: string;

  @ApiProperty({ description: 'The work experience of the applicant' })
  @IsInt()
  workExperience: number;

  @ApiProperty({ description: 'The teaching experience of the applicant' })
  @IsInt()
  teachingExperience: number;

  @ApiProperty({ description: 'The KPI of the applicant' })
  @IsInt()
  @Min(0)
  @Max(100)
  KPI: number;

  @ApiProperty({ description: 'The ID of the vacancy being applied for' })
  @IsUUID()
  vacancyId: string;

  @ApiProperty({
    description: 'The number of projects completed by the applicant (optional)',
  })
  @IsOptional()
  @IsInt()
  no_projects: number;

  @ApiProperty({
    description: 'The number of publications by the applicant (optional)',
  })
  @IsOptional()
  @IsInt()
  no_publications: number;

  @ApiProperty({
    description: "The document showing the applicant's work experience",
  })
  @IsNotEmpty()
  workExperienceDocument: string;

  @ApiProperty({
    description: "The document showing the applicant's teaching experience",
  })
  @IsNotEmpty()
  teachingExperienceDocument: string;

  @ApiProperty({
    description: "The document showing the applicant's academic rank",
  })
  @IsNotEmpty()
  academicRankDocument: string;

  @ApiProperty({ description: "The document showing the applicant's KPI" })
  @IsNotEmpty()
  KpiDocument: string;

  @ApiProperty({
    description: "The document showing the applicant's research experience",
  })
  @IsNotEmpty()
  researchExperienceDocument: string;
  strategicPlanDocument: string;
}
