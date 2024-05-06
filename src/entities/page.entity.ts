import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { Status, YesNo } from 'src/common/enums/all.enum';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Resource } from './resources.entity';
import { User } from './user.entity';

@Entity({ name: 'pages' })
export class Page extends BaseEntity {

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column({ nullable: true, default: null })
    description: string;

    @Column()
    sort: number;

    @Column({ type: "enum", enum: YesNo, default: YesNo.No })
    is_on_footer: YesNo

    @Column()
    image_id: number;

    @OneToOne(() => Resource, (image) => image.uid)
    @JoinColumn({ name: "image_id" })
    image: Resource

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "created_by" })
    createdBy: User;

    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    public status: Status;

}