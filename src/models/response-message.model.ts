import { Expose } from "class-transformer";
import { ResponseStatus } from "src/common/enums/all.enum";

export class ResponseMessage {
  public status: ResponseStatus;
  public message: string;
}
