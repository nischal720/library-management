import { BaseEntity } from 'src/database/entities/base.entity';
import { Resource } from 'src/entities/resources.entity';
import { OneToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Entity, Column } from 'typeorm';
import { StudentToParent } from './student-parent-relation.entity';
import { StudentSibling } from './student_sibling.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Subject } from './subject.entity';

@Entity({ name: 'student' })
export class StudentInfo extends BaseEntity {
  @ApiProperty()
  @Column({ nullable: true, unique: true })
  regid: string;

  @ApiProperty()
  @Column({ nullable: true, unique: true })
  public uni_reg: string;

  @ApiProperty()
  @Column({ length: '20' })
  first_name: string;

  @ApiProperty()
  @Column({ length: '20' })
  last_name: string;

  @ApiProperty({ enum: ['Male', 'Female', 'Other'] })
  @Column({ type: 'enum', enum: ['Male', 'Female', 'Other'] })
  gender: string;

  @ApiProperty()
  @Column({ type: 'char', length: 10 })
  admission_date_np: string;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  admission_date_en: Date;

  @ApiProperty()
  @Column({ type: 'char', length: 10 })
  dob_np: string;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  dob_en: Date;

  @ApiProperty()
  @Column({ nullable: true })
  phone1: string;

  @ApiProperty()
  @Column({ nullable: true })
  phone2: string;

  @ApiProperty()
  @Column({ nullable: true })
  email: string;

  @ApiProperty()
  @Column({ length: 2, nullable: true })
  blood_group: string;

  @ApiProperty()
  @Column({ length: 20 })
  nationality: string;

  @ApiProperty()
  @Column({ length: 20, nullable: true })
  religion: string;

  @ApiProperty()
  @Column({ length: 20, nullable: true })
  cast: string;

  @ApiProperty()
  @Column({ length: 20, nullable: true })
  ethnic: string;

  @ApiProperty()
  @Column({ length: 20, nullable: true })
  disability: string;

  @ApiProperty()
  @Column({ length: 200 })
  address1: string;

  @ApiProperty()
  @Column({ nullable: true, length: 200 })
  address2: string;

  @ApiProperty()
  @Column()
  imgId: number;

  @ApiProperty()
  @OneToOne(() => Resource, (image) => image.id)
  img: Resource;

  @ApiProperty()
  @Column({ length: 50, nullable: true })
  user: string;

  @ApiProperty({
    enum: ['Active', 'Inactive'],
    default: 'Active',
  })
  @Column({
    type: 'enum',
    enum: ['Active', 'Inactive'],
    default: 'Active',
  })
  status: string;

  @ApiProperty({ type: [StudentToParent] })
  @OneToMany(() => StudentToParent, (relation) => relation.relation)
  studentRelations: StudentToParent[];

  @ApiProperty({ type: [StudentSibling] })
  @OneToMany(() => StudentSibling, (sibling) => sibling.student1)
  siblings1: StudentSibling[];

  @ApiProperty({ type: [StudentSibling] })
  @OneToMany(() => StudentSibling, (sibling) => sibling.student2)
  siblings2: StudentSibling[];

  @ManyToMany(() => Subject, (subject) => subject.name)
  @JoinTable({ name: 'subject_id' })
  subjects: Subject[];
}
