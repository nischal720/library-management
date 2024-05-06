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
import { BlogService } from "./blog.service";
import { BlogResponseDto } from "./dto/blog.response.dto";
import { BlogUpdateDto } from "./dto/blog.update.dto";
import { BlogDto, BlogPage } from "./dto/blog.dto";
import { BlogSearchDto } from "./dto/blog.search.dto";
import { AdminJwtAuthGuard } from "../auth/guards/admin.jwt.guard";

@ApiTags("blog")
@ApiBearerAuth()
@UseGuards(AdminJwtAuthGuard)
@Controller("blog")
export class BlogController {
  constructor(
    private blogService: BlogService,
  ) { }

  @ApiResponse({
    type: BlogPage,
  })
  @Get("/")
  @UsePipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))
  getTypes(
    @Query() blogSearchDto: BlogSearchDto,
    @Query() pageDto: PageDto
  ): Promise<BlogPage> {
    return this.blogService.getAll(pageDto, blogSearchDto);
  }

  @Post("/")
  addBlog(@Body() blogDto: BlogDto, @Request() req): Promise<BlogResponseDto> {
    const _user = req.user;
    return this.blogService.add(blogDto);
  }

  @Get("/:id")
  getBlogById(
    @Param("id") id: number
  ): Promise<BlogResponseDto> {
    return this.blogService.getById(id);
  }

  @Patch("/:id")
  @Put("/:id")
  updateBlog(
    @Body() updateDto: BlogUpdateDto,
    @Param("id") id: number
  ): Promise<BlogResponseDto> {
    return this.blogService.update(id, updateDto);
  }

}
