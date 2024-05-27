import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentSibling } from '../entities/student_sibling.entity';
import { StudentInfo } from '../entities/student_info.entity';
import {
  CreateStudentSiblingDto,
  UpdateStudentSiblingDto,
} from '../dto/create-student-sibling.dto';

@Injectable()
export class StudentSiblingService {
  constructor(
    @InjectRepository(StudentSibling)
    private studentSiblingRepository: Repository<StudentSibling>,
    @InjectRepository(StudentInfo)
    private studentInfoRepository: Repository<StudentInfo>,
  ) {}

  async createSiblingRelation(
    createSiblingDto: CreateStudentSiblingDto,
  ): Promise<StudentSibling> {
    const { student1Id, student2Id, relation } = createSiblingDto;

    if (student1Id === student2Id) {
      throw new NotAcceptableException(
        'A student cannot be a sibling to themselves',
      );
    }

    const existingRelation = await this.studentSiblingRepository.findOne({
      where: [
        { student1: { id: student1Id }, student2: { id: student2Id } },
        { student1: { id: student2Id }, student2: { id: student1Id } },
      ],
    });

    if (existingRelation) {
      throw new HttpException(
        'A sibling relation between these students already exists',
        HttpStatus.CONFLICT,
      );
    }

    const student1 = await this.studentInfoRepository.findOne({
      where: { id: student1Id },
    });
    const student2 = await this.studentInfoRepository.findOne({
      where: { id: student2Id },
    });

    const siblingRelation = this.studentSiblingRepository.create({
      student1,
      student2,
      relation,
    });
    return this.studentSiblingRepository.save(siblingRelation);
  }

  async getSiblingsByStudentId(studentId: number): Promise<StudentSibling[]> {
    return this.studentSiblingRepository.find({
      where: [{ student1: { id: studentId } }, { student2: { id: studentId } }],
      relations: ['student1', 'student2'],
    });
  }

  async getSiblingById(id: number): Promise<StudentSibling> {
    const siblingRelation = await this.studentSiblingRepository.findOne({
      where: { id },
      relations: ['student1', 'student2'],
    });
    if (!siblingRelation) {
      throw new NotFoundException(`Sibling relation with ID ${id} not found`);
    }
    return siblingRelation;
  }

  async getAllSiblingRelations(): Promise<StudentSibling[]> {
    return this.studentSiblingRepository.find({
      relations: ['student1', 'student2'],
    });
  }

  async deleteSiblingRelation(id: number) {
    const result = await this.studentSiblingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sibling relation with ID ${id} not found`);
    }
    return 'Success';
  }

  async updateSiblingRelation(
    updateSiblingDto: UpdateStudentSiblingDto,
  ): Promise<StudentSibling> {
    const { id, student1Id, student2Id, relation } = updateSiblingDto;

    if (student1Id === student2Id) {
      throw new Error('A student cannot be a sibling to themselves');
    }

    const existingRelation = await this.studentSiblingRepository.findOne({
      where: { id },
    });

    if (!existingRelation) {
      throw new NotFoundException(`Sibling relation with ID ${id} not found`);
    }

    existingRelation.student1 = await this.studentInfoRepository.findOne({
      where: { id: student1Id },
    });
    existingRelation.student2 = await this.studentInfoRepository.findOne({
      where: { id: student2Id },
    });
    existingRelation.relation = relation;

    return this.studentSiblingRepository.save(existingRelation);
  }
}
