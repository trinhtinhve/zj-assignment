import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

async function run(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dbService = app.get<PrismaService>(PrismaService);

  await dbService.tournament.create({
    data: {
      name: 'Tournament 1',
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const date = new Date();
  await dbService.fixture.create({
    data: {
      tournamentId: 1,
      matchDate: date,
    },
  });

  date.setDate(date.getDate() + 1);
  await dbService.fixture.create({
    data: {
      tournamentId: 1,
      matchDate: date,
    },
  });

  date.setDate(date.getDate() + 2);
  await dbService.fixture.create({
    data: {
      tournamentId: 1,
      matchDate: date,
    },
  });

  await dbService.team.createMany({
    data: [
      {
        name: 'Team 1',
      },
      {
        name: 'Team 2',
      },
      {
        name: 'Team 3',
      },
      {
        name: 'Team 4',
      },
    ],
  });

  await dbService.match.createMany({
    data: [
      {
        fixtureId: 1,
        team1Id: 1,
        team2Id: 2,
        name: 'match 1',
        status: 'live',
      },
      {
        fixtureId: 1,
        team1Id: 2,
        team2Id: 3,
        name: 'match 2',
        status: 'PT',
      },
      {
        fixtureId: 2,
        team1Id: 3,
        team2Id: 4,
        name: 'match 3',
        status: 'PT',
      },
      {
        fixtureId: 3,
        team1Id: 1,
        team2Id: 4,
        name: 'match 1',
        status: 'PT',
      },
    ],
  });

  console.log('Seeds created');
}

run();
