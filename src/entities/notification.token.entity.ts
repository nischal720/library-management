import { BaseMinEntity } from 'src/database/entities/base.min.entity';
import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Status } from 'src/common/enums/all.enum';

@Entity({ name: 'notification_tokens' })
export class NotificationToken extends BaseMinEntity {

    @Column()
    user_id: number;

    @Column()
    user_type: string;

    @Column()
    device_type: string;

    @Column()
    notification_token: string;

    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    public status: Status;
}