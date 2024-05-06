import { Entity, Column, BeforeInsert, JoinColumn, ManyToOne } from 'typeorm';
import { SeenStatus, Status } from 'src/common/enums/all.enum';
import { BaseEntity } from 'src/database/entities/base.entity';
import { NotificationBody } from 'src/common/interface';

@Entity({ name: 'notifications' })
export class Notification extends BaseEntity {

    @Column()
    title: string;

    @Column({ type: 'json', nullable: true })
    body: NotificationBody;

    @Column({ nullable: true })
    user_id: number;

    @Column({ nullable: true })
    user_type: string;

    @Column({ type: "enum", enum: SeenStatus, default: SeenStatus.unseen })
    public seen: SeenStatus;

    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    public status: Status;

}