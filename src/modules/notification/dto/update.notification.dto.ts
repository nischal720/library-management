import { ApiProperty } from "@nestjs/swagger";
import { SeenStatus, Status } from "src/common/enums/all.enum";

export class UpdateNotificationDto {
    // seen: SeenStatus

    // status: Status

    @ApiProperty()
    device_type: string
}