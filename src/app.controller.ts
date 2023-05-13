import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthService } from './auth/auth.service';
import { HasRoles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';
import { Role } from './model/role.enum';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginDto } from './auth/dto/LoginDto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/creat-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    const users = await this.prisma.user.findMany();
    return users;
  }
  @HasRoles([Role.APPLICANT, Role.OFFICE])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      console.log(user);
      return this.authService.login(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Body() body: LoginDto) {
    return this.authService.login(req.user);
  }
}
