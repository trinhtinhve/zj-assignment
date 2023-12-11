import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetTournamentResponse } from './tournament.model';
import { BadRequestEx } from '../exceptions/http.exception';
import { errorCodes } from './tournament.error-code';

@Injectable()
export class TournamentService {
  constructor(private dbService: PrismaService) {}

  async getTournament(tournamentId: number): Promise<GetTournamentResponse> {
    const tournamentData = await this.dbService.tournament.findUnique({
      where: {
        id: tournamentId,
      },
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
        fixtures: true,
      },
    });

    if (!tournamentData) {
      throw new BadRequestEx(errorCodes.NOT_FOUND, 'Tournament not found.');
    }

    return {
      id: tournamentData.id,
      name: tournamentData.name,
      startDate: tournamentData.startDate,
      endDate: tournamentData.endDate,
      fixtures: tournamentData.fixtures.map((fixture) => ({
        id: fixture.id,
        matchDate: fixture.matchDate,
      })),
    };
  }
}
