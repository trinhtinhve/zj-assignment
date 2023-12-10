import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export class BadRequestEx extends BadRequestException {
  constructor(statusCode: string, message?: string | unknown) {
    super({
      statusCode,
      message:
        typeof message === 'string'
          ? message
          : JSON.stringify(message) || statusCode,
    });
  }
}

export class UnauthorizedEx extends UnauthorizedException {
  constructor(statusCode: string, message?: string) {
    super({
      statusCode,
      message:
        typeof message === 'string'
          ? message
          : JSON.stringify(message) || statusCode,
    });
  }
}
