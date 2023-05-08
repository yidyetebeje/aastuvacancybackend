import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateVacancyDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Vacancy name', minLength: 3, maxLength: 40 })
  @Length(3, 40)
  name: string;
  @IsNotEmpty()
  @Length(3, 255)
  @ApiProperty({
    description: 'Vacancy description',
    minLength: 3,
    maxLength: 255,
  })
  description: string;
  @IsNotEmpty()
  @Length(3, 255)
  @ApiProperty({ description: 'position id', minLength: 3, maxLength: 255 })
  positionId: string;
}
