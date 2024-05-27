import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './service/student.service';
import { StudentController } from './controller/student.controller';
import { StudentInfo } from './entities/student_info.entity';
import { ParentService } from './service/parent.service';
import { ParentController } from './controller/parent.controller';
import { Parent } from './entities/parent_info.entity';
import { StudentToParent } from './entities/student-parent-relation.entity';
import { StudentToParentService } from './service/student_parent_relation.service';
import { StudentToParentController } from './controller/student_parent_relation.controller';
import { StudentSibling } from './entities/student_sibling.entity';
import { StudentSiblingService } from './service/srudent_sibling.service';
import { StudentSiblingController } from './controller/student_sibling.controller';
import { StudentCurrent } from './entities/student_current.entity';
import { StudentLog } from './entities/student_log.entity';
import { StudentCurrentService } from './service/student_current.service';
import { StudentCurrentController } from './controller/student_current.controller';
import { StudentAcademic } from './entities/student_academic.entity';
import { StudentAcademicService } from './service/student_academic.service';
import { StudentAcademicController } from './controller/student_academic.controller';
import { StudentNote } from './entities/student_notes.entity';
import { StudentNoteService } from './service/student_notes.service';
import { StudentNotesController } from './controller/student_note.controller';
import { StudentAttendance } from './entities/student_attendance.entity';
import { StudentAttendanceService } from './service/student_attendance.service';
import { StudentAttendanceController } from './controller/student_attendance.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentInfo,
      Parent,
      StudentToParent,
      StudentSibling,
      StudentCurrent,
      StudentLog,
      StudentAcademic,
      StudentNote,
      StudentAttendance,
    ]),
  ],
  providers: [
    StudentService,
    ParentService,
    StudentToParentService,
    StudentSiblingService,
    StudentCurrentService,
    StudentAcademicService,
    StudentNoteService,
    StudentAttendanceService,
  ],
  controllers: [
    StudentController,
    ParentController,
    StudentToParentController,
    StudentSiblingController,
    StudentCurrentController,
    StudentAcademicController,
    StudentNotesController,
    StudentAttendanceController,
  ],
})
export class StudentModule {}
