import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { classToPlain, plainToClass } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return plainToClass(data, { excludeExtraneousValues: true }) as T;
      })
    );
  }
}
