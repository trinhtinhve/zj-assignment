import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    this.handleLogging(exception);
    this.handleResponse(host, exception, httpAdapter);
  }

  private handleLogging(exception: HttpException | Error): void {
    const message =
      exception instanceof HttpException
        ? JSON.stringify(exception.getResponse())
        : exception.message;

    this.logger.error(message, exception.stack);
  }

  private handleResponse(
    host: ArgumentsHost,
    exception: HttpException | Error,
    httpAdapter: AbstractHttpAdapter,
  ): void {
    let responseBody: object = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Something went wrong',
    };
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const resBody = exception.getResponse();

      if (typeof resBody === 'string') {
        responseBody = {
          statusCode: status,
          message: [resBody],
        };
      } else {
        responseBody = resBody;
      }
    }

    const response = host.getArgByIndex(1);
    if (!httpAdapter.isHeadersSent(response)) {
      httpAdapter.reply(response, responseBody, status);
    } else {
      httpAdapter.end(response);
    }
  }
}
