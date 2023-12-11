import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FixtureService } from '../../src/fixture/fixture.service';
import { FixtureController } from '../../src/fixture/fixture.controller';
import { PrismaService } from '../../src/prisma/prisma.service';
import { PrismaModule } from '../../src/prisma/prisma.module';

describe('Fixture', () => {
  let app: INestApplication;
  const prismaSerice = {
    fixture: {
      findMany: jest.fn(),
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [FixtureController],
      providers: [FixtureService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaSerice)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/v1/fixtures', () => {
    const now = new Date();
    const fixturesDataMock = [
      {
        id: 1,
        tournament: {
          name: 'tournament name 1',
        },
        matchDate: now,
        matches: [],
      },
    ];

    prismaSerice.fixture.findMany.mockResolvedValueOnce(fixturesDataMock);
    return request(app.getHttpServer())
      .get('/v1/fixtures')
      .expect(200)
      .expect({
        fixtures: [
          {
            id: 1,
            tournamentName: 'tournament name 1',
            matchDate: now.toISOString(),
            matches: [],
          },
        ],
      });
  });
});
