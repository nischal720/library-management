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
import { PageDto as PagableDto } from "src/common/dto/page.dto";
import { PageService } from "./page.service";
import { PageResponseDto } from "./dto/page.response.dto";
import { PageUpdateDto } from "./dto/page.update.dto";
import { PageDto, PagePage } from "./dto/page.dto";
import { PageSearchDto } from "./dto/page.search.dto";
import { AdminJwtAuthGuard } from "../auth/guards/admin.jwt.guard";

@ApiTags("page")
@ApiBearerAuth()
@UseGuards(AdminJwtAuthGuard)
@Controller("page")
export class PageController {
  constructor(
    private pageService: PageService,
  ) { }

  @ApiResponse({
    type: PagePage,
  })
  @Get("/")
  @UsePipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))
  getTypes(
    @Query() searchDto: PageSearchDto,
    @Query() pageDto: PagableDto,
  ): Promise<PagePage> {
    return this.pageService.getAll(pageDto, searchDto);
  }

  @Post("/")
  addPage(@Body() pageDto: PageDto, @Request() req): Promise<PageResponseDto> {
    const { userId } = req.user;
    return this.pageService.add(pageDto);
  }

  @Get("/:id")
  getPageById(
    @Param("id") id: number
  ): Promise<PageResponseDto> {
    return this.pageService.getById(id);
  }

  @Patch("/:id")
  @Put("/:id")
  updatePage(
    @Body() groupDto: PageUpdateDto,
    @Param("id") id: number
  ): Promise<PageResponseDto> {
    return this.pageService.update(id, groupDto);
  }

}
