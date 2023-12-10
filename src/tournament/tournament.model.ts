export class Fixture {
  id: number;
  matchDate: Date;
}

export class GetTournamentResponse {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  fixtures: Fixture[];
}
