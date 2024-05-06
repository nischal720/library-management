import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { Status } from 'src/common/enums/all.enum';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Resource } from './resources.entity';
import { User } from './user.entity';

@Entity({ name: 'blogs' })
export class Blog extends BaseEntity {

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column()
    short_title: string;

    @Column()
    description: string;

    @Column({ nullable: true, default: null })
    author: string;

    @Column({ nullable: true, default: null })
    publish_date: Date;

    @Column()
    sort: number;

    @Column()
    feature_id: number;

    @Column()
    cover_id: number;

    @OneToOne(() => Resource, (image) => image.id)
    @JoinColumn({ name: "feature_id" })
    feature_image: Resource

    @OneToOne(() => Resource, (image) => image.id)
    @JoinColumn({ name: "cover_id" })
    cover_image: Resource

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "created_by" })
    createdBy: User;

    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    public status: Status;

}