import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class GetFixturesQuery {
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

export class GetFixturesResponse {}
