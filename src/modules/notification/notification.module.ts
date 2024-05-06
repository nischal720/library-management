import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationToken } from "src/entities/notification.token.entity";
import { NotificationService } from "./notification.service";
import { Notification } from "src/entities/notification.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Notification, NotificationToken]),
    ],
    exports: [NotificationService],
    providers: [NotificationService],
})
export class NotificationModule { }
