import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentNote } from '../entities/student_notes.entity';
import {
  CreateStudentNoteDto,
  StudentNoteResponse,
  UpdateNoteDto,
} from '../dto/student_note.dto';
import { Repository } from 'typeorm';

@Injectable()
export class StudentNoteService {
  constructor(
    @InjectRepository(StudentNote)
    private readonly studentNoteRepository: Repository<StudentNote>,
  ) {}

  async createStudentNote(
    createNoteDto: CreateStudentNoteDto,
  ): Promise<StudentNoteResponse> {
    const studentNote = this.studentNoteRepository.create(createNoteDto);
    return this.studentNoteRepository.save(studentNote);
  }

  async getAllNotes(
    student_id: number,
    user_id: number,
  ): Promise<StudentNoteResponse[]> {
    const query = this.studentNoteRepository.createQueryBuilder('student_note');

    if (student_id) {
      query.andWhere('student_note.student_id = :student_id', { student_id });
    }

    if (user_id) {
      query.andWhere('student_note.user_id = :user_id', { user_id });
    }

    return query.getMany();
  }

  async findNoteById(id: number): Promise<StudentNote> {
    const studentNote = await this.studentNoteRepository.findOne({
      where: { id: id },
    });
    if (!studentNote) {
      throw new NotFoundException('Notes not found');
    }
    return studentNote;
  }

  async updateNote(
    id: number,
    updateNoteDto: UpdateNoteDto,
  ): Promise<StudentNoteResponse> {
    const studentNote = await this.studentNoteRepository.findOne({
      where: { id: id },
    });
    if (!studentNote) {
      throw new NotFoundException('Notes not found');
    }
    await this.studentNoteRepository.update(id, updateNoteDto);
    return this.studentNoteRepository.findOne({ where: { id: id } });
  }

  async deleteNote(id: number) {
    await this.studentNoteRepository.delete(id);
    return 'Success';
  }
}
