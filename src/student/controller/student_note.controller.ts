import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StudentNoteService } from '../service/student_notes.service';
import {
  CreateStudentNoteDto,
  StudentNoteResponse,
  UpdateNoteDto,
} from '../dto/student_note.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('student-notes')
@Controller('student-notes')
export class StudentNotesController {
  constructor(private readonly studentNotesService: StudentNoteService) {}

  @ApiResponse({ type: StudentNoteResponse })
  @Post()
  createNotes(
    @Body() createNoteDto: CreateStudentNoteDto,
  ): Promise<StudentNoteResponse> {
    return this.studentNotesService.createStudentNote(createNoteDto);
  }

  @Get()
  getAllNotes(
    @Query('student_id') student_id: number,
    @Query('user_id') user_id: number,
  ) {
    return this.studentNotesService.getAllNotes(student_id, user_id);
  }

  @Get(':id')
  getNoteById(@Param('id') id: number) {
    return this.studentNotesService.findNoteById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentNoteDto: UpdateNoteDto,
  ) {
    return this.studentNotesService.updateNote(id, updateStudentNoteDto);
  }

  @Delete(':id')
  deleteNote(@Param('id', ParseIntPipe) id: number) {
    return this.studentNotesService.deleteNote(id);
  }
}
