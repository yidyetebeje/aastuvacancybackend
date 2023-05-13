import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  UseGuards,
  Query,
  Request,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ApplyVacancyDto } from './dto/apply-vacancy.dto';
@ApiTags('vacancies')
@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create vacancy' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacanciesService.create(createVacancyDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all vacancies' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'The found record' })
  findAll(
    @Request() req,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('active', ParseBoolPipe) active: boolean,
  ) {
    try {
      return this.vacanciesService.findAll(
        page ? page : 1,
        limit ? limit : 10,
        active ? active : true,
        req.user ? (req?.user as User) : null,
      );
    } catch (error) {
      new InternalServerErrorException(error);
    }
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get vacancy by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'The found record' })
  findOne(@Param('id') id: string) {
    try {
      return this.vacanciesService.findOne(id);
    } catch (error) {
      new InternalServerErrorException(error);
    }
  }
  @Post(':id/extend')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Extend vacancy by id' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiBearerAuth()
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully extended.',
  })
  extend(@Param('id') id: string) {
    try {
      return this.vacanciesService.extend(id);
    } catch (error) {
      new InternalServerErrorException(error);
    }
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacanciesService.update(+id, updateVacancyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacanciesService.remove(+id);
  }
  @Post(':id/applications')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Apply to vacancy by id' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully applied.',
  })
  apply(
    @Param('id') id: string,
    @Request() req,
    @Body() applyVac: ApplyVacancyDto,
  ) {
    try {
      return this.vacanciesService.apply(id, applyVac, req.user as User);
    } catch (error) {
      new InternalServerErrorException(error);
    }
  }
  @Get(':id/applications')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all applications to vacancy by id' })
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully queried.',
  })
  getApplications(@Param('id') id: string, @Request() req) {
    try {
      return this.vacanciesService.getApplications(id, req.user as User);
    } catch (error) {
      new InternalServerErrorException(error);
    }
  }
  @Get(':id/applications/:applicationId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get application to vacancy by id' })
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully queried.',
  })
  getApplication(
    @Param('id') id: string,
    @Param('applicationId') applicationId: string,
    @Request() req,
  ) {
    try {
      return this.vacanciesService.getApplication(
        id,
        applicationId,
        req.user as User,
      );
    } catch (error) {
      new InternalServerErrorException(error);
    }
  }
  @Get('/applications/user')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all applications by user' })
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully queried.',
  })
  getApplicationsByUser(@Request() req) {
    try {
      return this.vacanciesService.getApplicationsByUser(req.user as User);
    } catch (error) {
      new InternalServerErrorException(error);
    }
  }
}
