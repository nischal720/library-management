import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as firebase from 'firebase-admin';
import * as path from 'path';
import { Notification } from 'src/entities/notification.entity';
import { NotificationToken } from 'src/entities/notification.token.entity';
import { NotificationDto } from './dto/notification.dto';
import { UpdateNotificationDto } from './dto/update.notification.dto';
import { EnableStatus, Status } from 'src/common/enums/all.enum';
import { INotificationUser, NotificationBody } from 'src/common/interface';

console.log(path.join(__dirname, "../../../", 'kiosk-5d481-2749a37aacfc.json'))
firebase.initializeApp({

    credential: firebase.credential.cert(
        path.join(__dirname, "../../../", 'kiosk-5d481-2749a37aacfc.json'),
    )
});

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification) private readonly notificationsRepo: Repository<Notification>,
        @InjectRepository(NotificationToken) private readonly notificationTokenRepo: Repository<NotificationToken>,
    ) { }

    acceptPushNotification = async (
        user: INotificationUser,
        notification_dto: NotificationDto,
    ): Promise<NotificationToken> => {
        await this.notificationTokenRepo.update(
            {
                user_id: user?.id,
                user_type: user?.userType
            },
            {
                status: Status.INACTIVE,
            },
        );
        // save to db
        const notification_token = await this.notificationTokenRepo.save({
            user_id: user.id,
            user_type: user.userType,
            device_type: notification_dto.device_type,
            notification_token: notification_dto.notification_token,
            status: Status.ACTIVE,
        });
        return notification_token;
    };

    disablePushNotification = async (
        user: INotificationUser,
        update_dto: UpdateNotificationDto,
    ): Promise<void> => {
        try {
            await this.notificationTokenRepo.update(
                {
                    user_id: user.id,
                    user_type: user.userType,
                    device_type: update_dto.device_type
                },
                {
                    status: Status.INACTIVE,
                },
            );
        } catch (error) {
            return error;
        }
    };

    getNotifications = async (user: INotificationUser): Promise<any> => {
        return await this.notificationsRepo.find({
            select: ["title", "body", "seen"],
            where: { user_id: user.id, user_type: user.userType },
            order: { createdAt: "asc" }
        });
    };

    sendAllPush = async (users: INotificationUser[], title: string, body: NotificationBody): Promise<void> => {
        try {
            for (const user of users) {
                this.sendPush(user, title, body);
            }
        } catch (error) {
            return error;
        }
    };

    sendPush = async (user: INotificationUser, title: string, body: NotificationBody): Promise<void> => {
        try {
            if (user.notificationStatus === EnableStatus.Disabled) {
                return;
            }
            const notification = await this.notificationTokenRepo.find({
                select: ["notification_token"],
                where: { user_id: user.id, user_type: user.userType, status: Status.ACTIVE },
            });
            await this.notificationsRepo.save({
                user_id: user.id,
                user_type: user.userType,
                title,
                body,
                status: Status.ACTIVE
            });
            let bb = JSON.stringify(body);
            console.log(notification);
            if (notification.length > 0) {
                this.pushFireBase(notification.join(","), title, bb)
            }
        } catch (error) {
            console.log(error)
            return error;
        }
    };

    private async pushFireBase(token: string, title: string, body: string) {

        await firebase
            .messaging()
            .send({
                notification: { title, body },
                token,
                android: { priority: 'high' },
            })
            .catch((error: any) => {
                console.error(error);
            });
    }
}