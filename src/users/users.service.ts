import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/creat-user.dto';

@ApiTags('users')
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new user
   * @param createUserDto The data for the new user
   * @returns The newly created user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: createUserDto.password,
          name: createUserDto.name,
          role: createUserDto.role,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Find a user by email address
   * @param email The email address of the user to find
   * @returns The user with the specified email address
   */
  async findOne(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }
}
