import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/model/role.enum';
import { HasRoles } from 'src/auth/roles.decorator';

@ApiTags('Positions')
@Controller('positions')
@UseGuards(JwtAuthGuard)
@HasRoles([Role.OFFICE])
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Create a position',
    description: 'Creates a new position.',
  })
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionsService.create(createPositionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all positions',
    description: 'Returns all positions.',
  })
  findAll() {
    return this.positionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a position by ID',
    description: 'Returns the position with the specified ID.',
  })
  findOne(@Param('id') id: string) {
    return this.positionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a position',
    description: 'Updates the position with the specified ID.',
  })
  update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionsService.update(+id, updatePositionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove a position',
    description: 'Removes the position with the specified ID.',
  })
  remove(@Param('id') id: string) {
    return this.positionsService.remove(id);
  }
}
