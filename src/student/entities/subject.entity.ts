import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('subject')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 50 })
  name: string;
}
