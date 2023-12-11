import { Test, TestingModule } from '@nestjs/testing';
import { FixtureService } from './fixture.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

describe('FixtureService', () => {
  let fixtureService: FixtureService;
  const prismaSerice = {
    fixture: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [FixtureService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaSerice)
      .compile();

    fixtureService = app.get<FixtureService>(FixtureService);
  });

  describe('getFixtures', () => {
    it('should return all fixtures', async () => {
      const now = new Date();
      const fixturesDataMock = [
        {
          id: 1,
          tournament: {
            name: 'tournament name 1',
          },
          matchDate: now,
          matches: [
            {
              id: 1,
              name: 'match 1',
              matchDate: now,
              team1: 'team1',
              team2: 'team2',
              scoreTeam1: 0,
              scoreTeam2: 0,
              status: 'TL',
            },
          ],
        },
      ];

      prismaSerice.fixture.findMany.mockResolvedValueOnce(fixturesDataMock);
      const fixtures = await fixtureService.getFixtures({
        skip: 0,
        take: 10,
        tournamentId: 1,
      });

      const expectedResult = {
        fixtures: [
          {
            id: 1,
            tournamentName: 'tournament name 1',
            matchDate: now,
            matches: [
              {
                id: 1,
                name: 'match 1',
                matchDate: now,
                team1: 'team1',
                team2: 'team2',
                scoreTeam1: 0,
                scoreTeam2: 0,
                status: 'TL',
              },
            ],
          },
        ],
      };

      expect(fixtures).toEqual(expectedResult);
    });
  });
});
