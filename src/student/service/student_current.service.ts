import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentCurrent } from '../entities/student_current.entity';
import { Repository } from 'typeorm';
import { CreateStudentCurrentDto } from '../dto/create_student_current.dto';
import { StudentLog } from '../entities/student_log.entity';
import { StudentInfo } from '../entities/student_info.entity';
import { UpdateStudentCurrentDTO } from '../dto/update_student_current.dto';

@Injectable()
export class StudentCurrentService {
  constructor(
    @InjectRepository(StudentCurrent)
    private readonly studentCurrentRepository: Repository<StudentCurrent>,
    @InjectRepository(StudentLog)
    private readonly studentLogRepository: Repository<StudentLog>,
    @InjectRepository(StudentInfo)
    private readonly studentInfo: Repository<StudentInfo>,
  ) {}

  async create(
    createStudentCurrentDto: CreateStudentCurrentDto,
  ): Promise<StudentCurrent> {
    const { state, student_id, ...rest } = createStudentCurrentDto;

    const studentPresent = await this.studentCurrentRepository.findOne({
      where: { student_id: student_id },
    });

    const existingStudent = await this.studentInfo.findOne({
      where: { id: student_id },
    });

    if (!existingStudent) {
      throw new NotFoundException(
        `Student with id ${student_id} is not present`,
      );
    }

    if (studentPresent) {
      throw new HttpException(
        'Student already present',
        HttpStatus.BAD_REQUEST,
      );
    }

    const student = this.studentCurrentRepository.create({
      ...rest,
      state,
      student_id,
    });

    return this.studentCurrentRepository.save(student);
  }

  async findAll(): Promise<StudentCurrent[]> {
    return this.studentCurrentRepository.find();
  }

  async findAllStudentLog(): Promise<StudentLog[]> {
    return this.studentLogRepository.find();
  }

  async updateStudentCurrent(
    id: number,
    updateCurrentDto: UpdateStudentCurrentDTO,
  ): Promise<StudentCurrent> {
    const student = await this.studentCurrentRepository.findOne({
      where: { id: id },
    });
    if (!student) {
      throw new NotFoundException(`Student with id ${id} is not present`);
    }

    const studentLog = this.studentLogRepository.create({
      ...student,
    });
    await this.studentLogRepository.save(studentLog);
    await this.studentCurrentRepository.update(id, updateCurrentDto);
    return this.studentCurrentRepository.findOne({
      where: { id: id },
    });
  }

  async deleteStudentCurentById(id: number) {
    const student = await this.studentCurrentRepository.findOne({
      where: { id: id },
    });
    if (!student) {
      throw new NotFoundException(`Student not present`);
    }
    await this.studentCurrentRepository.delete(id);
    return 'Success';
  }

  async findById(id: number): Promise<StudentCurrent | undefined> {
    const student = await this.studentCurrentRepository.findOne({
      where: { id: id },
    });
    if (!student) {
      throw new NotFoundException(`Student not present`);
    }
    return this.studentCurrentRepository.findOne({ where: { id: id } });
  }

  async findStudentLogById(id: number): Promise<StudentLog | undefined> {
    const student = await this.studentLogRepository.findOne({
      where: { id: id },
    });
    if (!student) {
      throw new NotFoundException(`Student not present`);
    }
    return this.studentLogRepository.findOne({ where: { id: id } });
  }
}
