import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { StudentDocuemnt } from '../entities/student_documents.entity';
import { Repository } from 'typeorm';
import { SudentDocDto, UpdateStudentDoc } from '../dto/student_doc.dto';
import { StudentFile } from '../entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentDocuemntService {
  constructor(
    @InjectRepository(StudentDocuemnt)
    private readonly studentDocumentRepository: Repository<StudentDocuemnt>,
    @InjectRepository(StudentFile)
    private readonly fileRepository: Repository<StudentFile>,
  ) {}

  async createDocuemnt(
    createDocumentDto: SudentDocDto,
  ): Promise<StudentDocuemnt> {
    const { doc, ...remainning } = createDocumentDto;
    const resource = { name: doc.name };
    const savedDoc = await this.fileRepository.save(resource);
    const createdDoc = {
      ...remainning,
      doc_id: savedDoc.id,
    };
    const studentDoc = await this.studentDocumentRepository.create(createdDoc);
    return this.studentDocumentRepository.save(studentDoc);
  }

  async updateDocument(
    id: number,
    updateDocDto: UpdateStudentDoc,
  ): Promise<StudentDocuemnt> {
    const { doc, doc_Id, ...remainning } = updateDocDto;
    const studentDoc = await this.studentDocumentRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!studentDoc) {
      throw new NotFoundException('Document not found ');
    }
    if (doc) {
      const resource = { name: doc.name };
      await this.fileRepository.update(doc_Id, resource);
    }
    await this.studentDocumentRepository.update(id, remainning);

    return await this.studentDocumentRepository.findOne({ where: { id: id } });
  }

  async findById(id: number): Promise<StudentDocuemnt> {
    const studentDoc = await this.studentDocumentRepository.findOne({
      where: { id: id },
    });
    if (!studentDoc) {
      throw new NotFoundException('Document not found ');
    }
    return studentDoc;
  }

  async getAllData(): Promise<StudentDocuemnt[]> {
    return await this.studentDocumentRepository.find();
  }

  async deleteDoc(id: number) {
    const studentDoc = await this.studentDocumentRepository.findOne({
      where: { id: id },
    });
    if (!studentDoc) {
      throw new NotFoundException('Document not found ');
    }
    if (studentDoc.doc_Id) {
      await this.studentDocumentRepository.delete(id);
    }
    await this.fileRepository.delete(studentDoc.doc_Id);
    return 'Success';
  }
}
