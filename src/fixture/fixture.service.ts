import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetFixturesQuery, GetFixturesResponse } from './fixture.model';

@Injectable()
export class FixtureService {
  constructor(private dbService: PrismaService) {}

  async getFixtures(
    getFixturesQuery: GetFixturesQuery,
  ): Promise<GetFixturesResponse> {
    // return this.dbService.
    console.log(getFixturesQuery);
    return null;
  }
}
