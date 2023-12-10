import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { errorCodes } from './tournament.error-code';
import { Public } from '../auth/auth.decorator';
import { GetTournamentResponse } from './tournament.model';

@ApiTags('Tournaments')
@ApiBearerAuth()
@Controller('v1/tournaments')
export class TournamentController {
  constructor(private service: TournamentService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: GetTournamentResponse })
  @ApiBadRequestResponse({
    description: `Possible Error codes: \n
    ${Object.values(errorCodes).join(', ')}`,
  })
  @ApiInternalServerErrorResponse()
  @Get('/:id')
  async getTournament(@Param('id') tournamentId: number) {
    return this.service.getTournament(tournamentId);
  }
}
