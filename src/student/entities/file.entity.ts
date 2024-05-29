import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('file')
export class StudentFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;
}
