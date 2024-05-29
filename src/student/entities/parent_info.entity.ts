import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/database/entities/base.entity';
import { StudentToParent } from './student-parent-relation.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BloodGroup, Gender } from 'src/common/enums/all.enum';
import { Resource } from 'src/entities/resources.entity';

@Entity('parents')
export class Parent extends BaseEntity {
  @ApiProperty()
  @Column({ length: 200 })
  firstName: string;

  @ApiProperty()
  @Column({ length: 200 })
  lastName: string;

  @ApiProperty()
  @Column({ length: 200, nullable: true })
  occupation: string | null;

  @ApiProperty()
  @Column({ length: 10, unique: true })
  phone: string;

  @ApiProperty()
  @Column({ length: 200, nullable: true })
  address1: string | null;

  @ApiProperty()
  @Column({ length: 200, nullable: true })
  address2: string | null;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: BloodGroup,
    nullable: true,
  })
  bloodGroup: BloodGroup | null;

  @ApiProperty()
  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender | null;

  @ApiProperty()
  @Column({ length: 200, nullable: true })
  email: string | null;

  @OneToOne(() => Resource, (img) => img.id)
  @JoinColumn({ name: 'imgId' })
  img: Resource; 

  @OneToMany(() => StudentToParent, (relation) => relation.relation)
  studentRelations: StudentToParent[];
}
