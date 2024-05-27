import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudentInfo } from '../entities/student_info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from '../dto/student.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { StudentSearchDto } from '../dto/student_search.dto';
import { Page, findAllByPage } from '@sksharma72000/nestjs-search-page';
import { StudentresponseDto } from '../dto/student_response.dto';
import { UpdateStudentDto } from '../dto/update.student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentInfo)
    private readonly studentRepository: Repository<StudentInfo>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<StudentInfo> {
    const { uni_reg } = createStudentDto;
    const studentPre = await this.studentRepository.findOne({
      where: {
        uni_reg: uni_reg,
      },
    });
    if (studentPre) {
      throw new HttpException('Student aleady present', HttpStatus.FORBIDDEN);
    }
    const student = await this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(student);
  }

  async findAll(
    pageable: PageDto,
    studentSearchDto: StudentSearchDto,
  ): Promise<Page<StudentresponseDto>> {
    return findAllByPage({
      repo: this.studentRepository,
      page: pageable,
      queryDto: studentSearchDto,
    });
  }

  async findById(id: number): Promise<StudentInfo> {
    const student = await this.studentRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!student) {
      throw new NotFoundException('Student not found by id' + ' ' + id);
    }

    return student;
  }

  async updateStudentInfo(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentInfo> {
    await this.studentRepository.update(id, updateStudentDto);
    return this.studentRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async deleteStudent(id: number) {
    await this.studentRepository.delete(id);
    return 'Success';
  }
}
