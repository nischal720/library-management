import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PageDto } from "src/common/dto/page.dto";
import { AdminJwtAuthGuard } from "../auth/guards/admin.jwt.guard";
import { AdminService } from "./admins.service";
import { AdminDto, AdminPage } from "./dto/admin.dto";
import { AdminSearchDto } from "./dto/admin.search.dto";
import { Admin } from "src/entities/admin.entity";
import { AdminUpdateDto } from "./dto/admin.update.dto";

@ApiTags("admin")
@ApiBearerAuth()
@UseGuards(AdminJwtAuthGuard)
@Controller("admin")
export class AdminController {
  constructor(
    private adminService: AdminService,
  ) { }

  @ApiResponse({
    type: AdminPage,
  })
  @Get("/")
  @UsePipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))
  getAdmin(
    @Query() adminSearchDto: AdminSearchDto,
    @Query() pageDto: PageDto,
  ): Promise<AdminPage> {
    return this.adminService.getAll(pageDto, adminSearchDto);
  }

  @Post("/")
  addAdmin(@Body() adminDto: AdminDto, @Request() req): Promise<Admin> {
    return this.adminService.add(adminDto);
  }

  @Get("/:id")
  getAdminById(
    @Param("id") id: number
  ): Promise<Admin> {
    return this.adminService.getById(id);
  }

  @Patch("/:id")
  @Put("/:id")
  updateAdmin(
    @Body() adminGroupDto: AdminUpdateDto,
    @Param("id") id: number
  ): Promise<Admin> {
    return this.adminService.update(id, adminGroupDto);
  }

}
