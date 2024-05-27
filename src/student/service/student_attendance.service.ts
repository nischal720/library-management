import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentAttendance } from '../entities/student_attendance.entity';
import {
  CreateStudentAttendanceDto,
  UpdateStudentAttendanceDto,
} from '../dto/student.attendance.dto';

@Injectable()
export class StudentAttendanceService {
  constructor(
    @InjectRepository(StudentAttendance)
    private readonly studentAttendanceRepository: Repository<StudentAttendance>,
  ) {}

  async create(
    createStudentAttendanceDto: CreateStudentAttendanceDto,
  ): Promise<StudentAttendance> {
    const attendance = this.studentAttendanceRepository.create(
      createStudentAttendanceDto,
    );
    return this.studentAttendanceRepository.save(attendance);
  }

  async findAll(): Promise<StudentAttendance[]> {
    return this.studentAttendanceRepository.find();
  }

  async findOne(id: number): Promise<StudentAttendance> {
    const isAttancePresent = await this.studentAttendanceRepository.findOne({
      where: { id: id },
    });
    if (!isAttancePresent) {
      throw new NotFoundException('Invalid Id or Not found');
    }
    return this.studentAttendanceRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateStudentAttendanceDto: UpdateStudentAttendanceDto,
  ) {
    const isAttancePresent = await this.studentAttendanceRepository.findOne({
      where: { id: id },
    });
    if (!isAttancePresent) {
      throw new NotFoundException('Invalid Id');
    }
    await this.studentAttendanceRepository.update(
      id,
      updateStudentAttendanceDto,
    );
    return this.studentAttendanceRepository.findOne({ where: { id: id } });
  }

  async remove(id: number) {
    const isAttancePresent = await this.studentAttendanceRepository.findOne({
      where: { id: id },
    });
    if (!isAttancePresent) {
      throw new NotFoundException('Invalid Id');
    }
    await this.studentAttendanceRepository.delete(id);
    return 'Success';
  }
}
