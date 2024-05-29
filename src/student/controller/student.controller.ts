import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { StudentService } from '../service/student.service';
import { CreateStudentDto } from '../dto/student.dto';
import { StudentSearchDto } from '../dto/student_search.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { UpdateStudentDto } from '../dto/update.student.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentInfo } from '../entities/student_info.entity';

@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiResponse({ type: CreateStudentDto })
  @Post('/')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get('/')
  findAll(
    @Query() pageDto: PageDto,
    @Query() studentSearchDto: StudentSearchDto,
  ) {
    return this.studentService.findAll(pageDto, studentSearchDto);
  }

  @Get(':id')
  getStdentById(@Param('id') id: number) {
    return this.studentService.findById(id);
  }

  @Patch(':id')
  @Put(':id')
  update(
    @Body() updateStudentDto: UpdateStudentDto,
    @Param('id') id: number,
  ): Promise<StudentInfo> {
    return this.studentService.updateStudentInfo(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.studentService.deleteStudent(id);
  }
}
