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
import { UsersService } from "./users.service";
import { UserDto, UserPage } from "./dto/user.dto";
import { UserSearchDto } from "./dto/user.search.dto";
import { User } from "src/entities/user.entity";
import { UserUpdateDto } from "./dto/user.update.dto";

@ApiTags("user")
@ApiBearerAuth()
@UseGuards(AdminJwtAuthGuard)
@Controller("user")
export class UsersController {
  constructor(
    private userService: UsersService,
  ) { }

  @ApiResponse({
    type: UserPage,
  })
  @Get("/")
  @UsePipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))
  getUsers(
    @Query() searchDto: UserSearchDto,
    @Query() pageDto: PageDto,
  ): Promise<UserPage> {
    return this.userService.getAll(pageDto, searchDto);
  }

  @Post("/")
  addUser(@Body() userDto: UserDto, @Request() req): Promise<User> {
    return this.userService.add(userDto);
  }

  @Get("/:id")
  getUserById(
    @Param("id") id: number
  ): Promise<User> {
    return this.userService.getById(id);
  }

  @Patch("/:id")
  @Put("/:id")
  updateUser(
    @Body() updateDto: UserUpdateDto,
    @Param("id") id: number
  ): Promise<User> {
    return this.userService.update(id, updateDto);
  }

}
