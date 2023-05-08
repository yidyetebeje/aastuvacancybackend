import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }
}
