import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateStudentCurrentDto } from '../dto/create_student_current.dto';
import { StudentCurrent } from '../entities/student_current.entity';
import { StudentCurrentService } from '../service/student_current.service';
import { StudentLog } from '../entities/student_log.entity';
import { UpdateStudentCurrentDTO } from '../dto/update_student_current.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('student-current')
@Controller('student-current')
export class StudentCurrentController {
  constructor(private readonly studentService: StudentCurrentService) {}
  @ApiResponse({ type: UpdateStudentCurrentDTO })
  @Post()
  create(
    @Body() createStudentCurrentDto: CreateStudentCurrentDto,
  ): Promise<StudentCurrent> {
    return this.studentService.create(createStudentCurrentDto);
  }

  @Get()
  findAll(): Promise<StudentCurrent[]> {
    return this.studentService.findAll();
  }

  @Get('/log')
  findStudentLog(): Promise<StudentLog[]> {
    return this.studentService.findAllStudentLog();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateStudentCurrentDto: UpdateStudentCurrentDTO,
  ): Promise<StudentCurrent> {
    return this.studentService.updateStudentCurrent(
      id,
      updateStudentCurrentDto,
    );
  }

  @Delete(':id')
  removeById(@Param('id') id: number) {
    return this.studentService.deleteStudentCurentById(id);
  }

  @Get(':id')
  findOneById(@Param('id') id: number): Promise<StudentCurrent | undefined> {
    return this.studentService.findById(id);
  }

  @Get('/log/:id')
  findLogById(@Param('id') id: number): Promise<StudentLog | undefined> {
    return this.studentService.findStudentLogById(id);
  }
}
