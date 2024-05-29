import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { StudentInfo } from '../entities/student_info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from '../dto/student.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { StudentSearchDto } from '../dto/student_search.dto';
import { Page, findAllByPage } from '@sksharma72000/nestjs-search-page';
import { StudentresponseDto } from '../dto/student_response.dto';
import { UpdateStudentDto } from '../dto/update.student.dto';
import { Resource } from 'src/entities/resources.entity';
import { StudentFile } from '../entities/file.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentInfo)
    private readonly studentRepository: Repository<StudentInfo>,
    @InjectRepository(StudentFile)
    private readonly studentFileRepository: Repository<StudentFile>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<StudentInfo> {
    const { uni_reg, img, ...studentDetails } = createStudentDto;
    const studentPre = await this.studentRepository.findOne({
      where: {
        uni_reg: uni_reg,
      },
    });
    if (studentPre) {
      throw new HttpException('Student aleady present', HttpStatus.CONFLICT);
    }
    const resource: DeepPartial<Resource> = { name: img.name };
    const saveImg = await this.studentFileRepository.save(resource);

    const createStudentData = {
      ...studentDetails,
      imgId: saveImg.id,
      uni_reg: uni_reg,
    };
    const student = await this.studentRepository.create(createStudentData);
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

  async deleteStudent(id: number) {
    await this.studentRepository.delete(id);
    return 'Success';
  }

  async updateStudentInfo(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentInfo> {
    const { img, ...updatedStudentDetails } = updateStudentDto;
    const student = await this.studentRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!student) {
      throw new NotFoundException('Student not found by id' + ' ' + id);
    }

    if (img) {
      const resource: DeepPartial<Resource> = { name: img.name };
      const saveImg = await this.studentFileRepository.save(resource);
      updatedStudentDetails.imgId = saveImg.id;
    }
    await this.studentRepository.update(id, updatedStudentDetails);
    return this.studentRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
