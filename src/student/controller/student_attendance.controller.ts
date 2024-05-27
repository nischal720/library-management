import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentAttendanceService } from '../service/student_attendance.service';
import {
  CreateStudentAttendanceDto,
  StudentAttendanceResponseDto,
  UpdateStudentAttendanceDto,
} from '../dto/student.attendance.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('student-attendance')
@Controller('student-attendance')
export class StudentAttendanceController {
  constructor(
    private readonly studentAttendanceService: StudentAttendanceService,
  ) {}

  @ApiResponse({
    type: StudentAttendanceResponseDto,
  })
  @Post()
  async create(@Body() createStudentAttendanceDto: CreateStudentAttendanceDto) {
    return this.studentAttendanceService.create(createStudentAttendanceDto);
  }

  @Get()
  findAll() {
    return this.studentAttendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.studentAttendanceService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStudentAttendanceDto: UpdateStudentAttendanceDto,
  ) {
    return this.studentAttendanceService.update(id, updateStudentAttendanceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.studentAttendanceService.remove(id);
  }
}
