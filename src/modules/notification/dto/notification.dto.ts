import { ApiProperty } from "@nestjs/swagger"

export class NotificationDto {

    @ApiProperty()
    device_type: string

    @ApiProperty()
    notification_token: string
}