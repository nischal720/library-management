import { ApiProperty } from "@nestjs/swagger"
import { NotificationType, SeenStatus } from "src/common/enums/all.enum"
import { NotificationBody } from "src/common/interface"

export class NotificationResponseDto {

    @ApiProperty()
    title: string

    @ApiProperty()
    body: NotificationBody

    @ApiProperty({ type: "enum", enum: SeenStatus })
    seen: SeenStatus


}