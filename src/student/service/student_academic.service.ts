import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudentAcademic } from '../entities/student_academic.entity';
import { CreateStudentAcademicDto } from '../dto/student_academic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAcademicDto } from '../dto/updateAcademic.dto';

@Injectable()
export class StudentAcademicService {
  constructor(
    @InjectRepository(StudentAcademic)
    private readonly sudentAcademicRepo: Repository<StudentAcademic>,
  ) {}

  async createAcademic(
    createAcademicDto: CreateStudentAcademicDto,
  ): Promise<StudentAcademic> {
    const studentAcademic = this.sudentAcademicRepo.create(createAcademicDto);
    return this.sudentAcademicRepo.save(studentAcademic);
  }

  async findAll(): Promise<StudentAcademic[]> {
    return this.sudentAcademicRepo.find();
  }

  async findById(id: number): Promise<StudentAcademic> {
    const student = this.sudentAcademicRepo.findOne({ where: { id: id } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  async update(
    id: number,
    updateAcademicDto: UpdateAcademicDto,
  ): Promise<StudentAcademic> {
    const student = await this.sudentAcademicRepo.findOne({
      where: { id: id },
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    await this.sudentAcademicRepo.update(id, updateAcademicDto);
    return this.sudentAcademicRepo.findOne({ where: { id: id } });
  }

  async deleteAcademic(id: number) {
    const student = await this.sudentAcademicRepo.findOne({
      where: { id: id },
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    await this.sudentAcademicRepo.delete(id);
    return 'Success';
  }
}
