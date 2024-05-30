import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { StudentInfo } from './student_info.entity';

@Entity('subject')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 50 })
  name: string;
  @ManyToMany(() => StudentInfo, (student) => student.subjects)
  students: StudentInfo[];
}
