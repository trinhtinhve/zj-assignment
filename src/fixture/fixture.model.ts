import { IsDateString, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class GetFixturesQuery {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @Transform(({ value }) => typeof value === 'string' && parseInt(value))
  @IsInt()
  tournamentId: number;

  @ApiProperty({
    type: String,
    example: new Date(),
  })
  @IsDateString()
  @IsOptional()
  fromDate?: string;

  @ApiProperty({
    type: String,
    example: new Date(),
  })
  @IsDateString()
  @IsOptional()
  toDate?: string;

  @ApiProperty({
    type: Number,
    example: 0,
    description: 'number of records will be skipped',
  })
  @Transform(({ value }) => typeof value === 'string' && parseInt(value))
  @IsInt()
  @Min(0)
  skip: number;

  @ApiProperty({
    type: Number,
    example: 10,
    description: 'number of records will be returned',
  })
  @Transform(({ value }) => typeof value === 'string' && parseInt(value))
  @IsInt()
  @Min(1)
  take: number;
}

export class Team {
  id: number;
  name: string;
}

export class Match {
  id: number;
  name: string;
  matchDate: Date;
  team1: Team;
  team2: Team;
  scoreTeam1: number;
  scoreTeam2: number;
  status: string;
}

export class Fixture {
  id: number;
  tournamentName: string;
  matchDate: Date;
  matches: Match[];
}

export class GetFixturesResponse {
  fixtures: Fixture[];
}
