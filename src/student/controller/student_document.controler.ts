import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentDocuemntService } from '../service/student_docuemnt.service';
import { SudentDocDto, UpdateStudentDoc } from '../dto/student_doc.dto';
import { StudentDocuemnt } from '../entities/student_documents.entity';

@ApiTags('student-documents')
@Controller('student-documents')
export class StudentDocumentComtroller {
  constructor(private readonly studentDocService: StudentDocuemntService) {}
  @ApiResponse({ type: SudentDocDto })
  @Post()
  async create(@Body() studentDocDto: SudentDocDto): Promise<StudentDocuemnt> {
    return this.studentDocService.createDocuemnt(studentDocDto);
  }

  @Patch(':id')
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDocDto: UpdateStudentDoc,
  ): Promise<StudentDocuemnt> {
    return this.studentDocService.updateDocument(id, updateDocDto);
  }

  @Get(':id')
  async getByid(@Param('id') id: number): Promise<StudentDocuemnt> {
    return this.studentDocService.findById(id);
  }

  @Get()
  async findAll(): Promise<StudentDocuemnt[]> {
    return this.studentDocService.getAllData();
  }

  @Delete(':id')
  async deleteData(@Param('id') id: number) {
    return this.studentDocService.deleteDoc(id);
  }
}
