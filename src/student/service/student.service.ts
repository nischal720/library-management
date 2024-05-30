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
import { Subject } from '../entities/subject.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentInfo)
    private readonly studentRepository: Repository<StudentInfo>,
    @InjectRepository(StudentFile)
    private readonly studentFileRepository: Repository<StudentFile>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<StudentInfo> {
    const { uni_reg, img, subjects, ...studentDetails } = createStudentDto;
    const studentPre = await this.studentRepository.findOne({
      where: { uni_reg: uni_reg },
    });
    if (studentPre) {
      throw new HttpException('Student already present', HttpStatus.CONFLICT);
    }

    const resource: DeepPartial<Resource> = { name: img.name };
    const saveImg = await this.studentFileRepository.save(resource);

    const createStudentData: DeepPartial<StudentInfo> = {
      ...studentDetails,
      imgId: saveImg.id,
      uni_reg: uni_reg,
    };

    const student = this.studentRepository.create(createStudentData);

    if (subjects && subjects.length > 0) {
      const subjectEntities = await Promise.all(
        subjects.map(async (subjectName) => {
          let subject = await this.subjectRepository.findOne({
            where: { name: subjectName },
          });
          if (!subject) {
            subject = this.subjectRepository.create({
              name: subjectName,
            } as DeepPartial<Subject>);
            await this.subjectRepository.save(subject);
          }
          return subject;
        }),
      );
      student.subjects = subjectEntities;
    }

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
      where: { id: id },
      relations: ['subjects'],
    });
    if (!student) {
      throw new NotFoundException('Student not found by id ' + id);
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
    const { img, subjects, ...updatedStudentDetails } = updateStudentDto;
    const student = await this.studentRepository.findOne({
      where: { id: id },
      relations: ['subjects'],
    });
    if (!student) {
      throw new NotFoundException('Student not found by id ' + id);
    }

    if (img) {
      const resource: DeepPartial<Resource> = { name: img.name };
      const saveImg = await this.studentFileRepository.save(resource);
      updatedStudentDetails.imgId = saveImg.id;
    }

    if (subjects && subjects.length > 0) {
      const subjectEntities = await Promise.all(
        subjects.map(async (subjectName) => {
          let subject = await this.subjectRepository.findOne({
            where: { name: subjectName },
          });
          if (!subject) {
            subject = this.subjectRepository.create({
              name: subjectName,
            } as DeepPartial<Subject>);
            await this.subjectRepository.save(subject);
          }
          return subject;
        }),
      );
      (updatedStudentDetails as any).subjects = subjectEntities; // Type assertion to handle dynamic property
    }

    await this.studentRepository.update(id, updatedStudentDetails);
    return this.studentRepository.findOne({
      where: { id: id },
      relations: ['subjects'],
    });
  }
}
