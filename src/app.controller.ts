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
import { CreateUserDto } from './dto/CreateUserDto';
import { LoginDto } from './auth/dto/LoginDto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
    private authService: AuthService,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    const users = await this.prisma.user.findMany();
    return users;
  }
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Body() body: LoginDto) {
    return this.authService.login(req.user);
  }
  @HasRoles(Role.APPLICANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
}
