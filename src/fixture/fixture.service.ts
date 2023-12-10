import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetFixturesQuery, GetFixturesResponse } from './fixture.model';

@Injectable()
export class FixtureService {
  constructor(private dbService: PrismaService) {}

  async getFixtures(query: GetFixturesQuery): Promise<GetFixturesResponse> {
    const fixturesData = await this.dbService.fixture.findMany({
      skip: query.skip,
      take: query.take,
      where: {
        ...(query.tournamentId && { tournamentId: query.tournamentId }),
        ...(query.fromDate &&
          query.toDate && {
            matchDate: {
              gte: new Date(query.fromDate),
              lte: new Date(query.toDate),
            },
          }),
      },
      select: {
        id: true,
        matchDate: true,
        tournament: true,
        matches: {
          select: {
            id: true,
            name: true,
            team1: true,
            team2: true,
            scoreTeam1: true,
            scoreTeam2: true,
            status: true,
          },
        },
      },
      orderBy: {
        matchDate: 'asc',
      },
    });

    return {
      fixtures: fixturesData.map((f) => ({
        id: f.id,
        tournamentName: f.tournament.name,
        matchDate: f.matchDate,
        matches: f.matches.map((m) => ({
          id: m.id,
          name: m.name,
          matchDate: f.matchDate,
          team1: m.team1,
          team2: m.team2,
          scoreTeam1: m.scoreTeam1,
          scoreTeam2: m.scoreTeam2,
          status: m.status,
        })),
      })),
    };
  }
}
