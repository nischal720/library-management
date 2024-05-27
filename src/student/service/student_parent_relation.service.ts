import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentToParent } from '../entities/student-parent-relation.entity';
import { CreateStudentToParentDto } from '../dto/student_to_parent.dto';
import { UpdateStudentToParentDto } from '../dto/update_student_parent.dto';

@Injectable()
export class StudentToParentService {
  constructor(
    @InjectRepository(StudentToParent)
    private readonly studentToParentRepository: Repository<StudentToParent>,
  ) {}

  async create(
    createStudentToParentDto: CreateStudentToParentDto,
  ): Promise<StudentToParent> {
    const studentToParent = this.studentToParentRepository.create(
      createStudentToParentDto,
    );
    return this.studentToParentRepository.save(studentToParent);
  }

  async findAll(): Promise<StudentToParent[]> {
    return this.studentToParentRepository.find();
  }

  async findOne(id: number): Promise<StudentToParent> {
    const studentToParent = await this.studentToParentRepository.findOne({
      where: { id: id },
    });
    if (!studentToParent) {
      throw new NotFoundException(`StudentToParent with ID ${id} not found`);
    }
    return studentToParent;
  }

  async update(
    id: number,
    updateStudentToParentDto: UpdateStudentToParentDto,
  ): Promise<StudentToParent> {
    const studentToParent = await this.studentToParentRepository.preload({
      id,
      ...updateStudentToParentDto,
    });
    if (!studentToParent) {
      throw new NotFoundException(`StudentToParent with ID ${id} not found`);
    }
    return this.studentToParentRepository.save(studentToParent);
  }

  async remove(id: number): Promise<void> {
    const studentToParent = await this.findOne(id);
    await this.studentToParentRepository.remove(studentToParent);
  }
}
