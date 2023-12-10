import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private dbService: PrismaService) {}

  async findOne(username: string): Promise<User> {
    return this.dbService.user.findUnique({
      where: {
        username,
      },
    });
  }
}
