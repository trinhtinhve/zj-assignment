import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { GetFixturesQuery, GetFixturesResponse } from './fixture.model';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { errorCodes } from './fixture.error-code';

@ApiTags('Fixtures')
@ApiBearerAuth()
@Controller('v1/fixtures')
export class FixtureController {
  constructor(private service: FixtureService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: GetFixturesResponse })
  @ApiBadRequestResponse({
    description: `Possible Error codes: \n
    ${Object.values(errorCodes).join(', ')}`,
  })
  @ApiInternalServerErrorResponse()
  @Get()
  public async getFixtures(@Query() getFixturesQuery: GetFixturesQuery) {
    return this.service.getFixtures(getFixturesQuery);
  }
}
