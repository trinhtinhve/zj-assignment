import { IsDateString, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class GetFixturesQuery {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @Transform(({ value }) => typeof value === 'string' && parseInt(value))
  @IsInt()
  tournamentId: number;

  @ApiPropertyOptional({
    type: String,
    example: new Date(),
  })
  @IsDateString()
  @IsOptional()
  fromDate?: string;

  @ApiPropertyOptional({
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
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'id of team',
  })
  id: number;

  @ApiProperty({
    type: String,
    example: 'team 1',
    description: 'team name',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'http://team-log.png',
    description: 'url of team logo',
  })
  logoUrl: string;
}

export class Match {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'id of match',
  })
  id: number;

  @ApiProperty({
    type: String,
    example: 'tournament 1',
    description: 'name of match',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: new Date(),
    description: 'date of match',
  })
  matchDate: Date;

  @ApiProperty({
    type: Team,
  })
  @Type(() => Team)
  team1: Team;

  @ApiProperty({
    type: Team,
  })
  @Type(() => Team)
  team2: Team;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'score of team 1',
  })
  scoreTeam1: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'score of team 2',
  })
  scoreTeam2: number;

  @ApiProperty({
    type: String,
    example: 'live',
    description: 'status of the match',
  })
  status: string;
}

export class Fixture {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'id of fixture',
  })
  id: number;

  @ApiProperty({
    type: String,
    example: 'tournament 1',
    description: 'name of tournamment',
  })
  tournamentName: string;

  @ApiProperty({
    type: String,
    example: new Date(),
    description: 'date of match',
  })
  matchDate: Date;

  @ApiProperty({
    type: Match,
    isArray: true,
  })
  @Type(() => Match)
  matches: Match[];
}

export class GetFixturesResponse {
  @ApiProperty({
    type: Fixture,
    isArray: true,
  })
  @Type(() => Fixture)
  fixtures: Fixture[];
}
