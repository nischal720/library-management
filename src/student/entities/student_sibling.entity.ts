import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { StudentInfo } from './student_info.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'student_sibling' })
@Unique(['student1', 'student2'])
export class StudentSibling extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => StudentInfo, (student) => student.siblings1)
  student1: StudentInfo;

  @ApiProperty()
  @ManyToOne(() => StudentInfo, (student) => student.siblings2)
  student2: StudentInfo;

  @ApiProperty()
  @Column({ type: 'varchar', length: 20 })
  relation: string;
}
