import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request, Response } from 'express';
import moment from 'moment';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { COMMON_CONSTANT } from 'src/shared/constants/common.constant';
import { RESPONSE_MESSAGE } from 'src/shared/decorators/response.decorator';
import type { LogStructure } from 'src/shared/services/logger.service';
import { LogService } from 'src/shared/services/logger.service';

export interface ResponseFormat<T> {
  status: boolean;
  message: string;
  result: T;
}
@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  constructor(private reflector: Reflector, private logService: LogService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        if (data) {
          const responsePayload = {
            status: true,
            message:
              this.reflector.get<string>(
                RESPONSE_MESSAGE,
                context.getHandler(),
              ) || COMMON_CONSTANT.RESPONSE_SUCCESS.MESSAGE,
            result: data.data || data,
          };

          const logData: LogStructure = {
            timestamp: moment().format(COMMON_CONSTANT.TIME.DATE_TIME_FORMAT),
            request: {
              url: request.url,
              method: request.method,
              params: request.params,
              body: request.body,
            },
            response: {
              status: response.statusCode,
              body: responsePayload,
            },
          };

          this.logService.info(JSON.stringify(logData));

          return responsePayload;
        }
      }),
    );
  }
}
