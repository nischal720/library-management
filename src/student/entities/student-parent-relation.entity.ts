import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StudentInfo } from './student_info.entity';
import { Parent } from './parent_info.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('student_to_parents')
export class StudentToParent {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => StudentInfo, (student) => student.studentRelations)
  @JoinColumn({ name: 'student_id' })
  student: StudentInfo;

  @ApiProperty()
  @ManyToOne(() => Parent, (parent) => parent.studentRelations)
  @JoinColumn({ name: 'parent_id' })
  parent: Parent;

  @ApiProperty()
  @Column()
  student_id: number;

  @ApiProperty()
  @Column()
  parent_id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 20 })
  relation: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['yes', 'no'],
  })
  isGuardian: 'yes' | 'no';
}
