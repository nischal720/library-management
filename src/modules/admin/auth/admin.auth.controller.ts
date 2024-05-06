import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UnprocessableEntityException,
  UseGuards,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "src/common/auth/dtos/login-user.dto";
import { AuthenticatedUser } from "src/common/auth/models/authenticated-user.model";
import { PasswordRequestResetDto } from "src/common/auth/dtos/password-request-reset.dto";
import { PasswordResetDto } from "src/common/auth/dtos/password-reset.dto";
import { RefreshTokenDto } from "src/common/auth/dtos/refresh-token.dto";
import { AdminAuthService } from "./admin.auth.service";
import { AdminAuthGuard } from "./guards/admin.auth.guard";
import { AdminService } from "../admins/admins.service";
import { ResponseMessage } from "src/models/response-message.model";

@ApiTags("auth")
@Controller("auth")
export class AdminAuthController {
  constructor(
    private readonly authService: AdminAuthService,
    private readonly userService: AdminService
  ) { }

  @ApiResponse({
    type: AuthenticatedUser,
  })
  @UseGuards(AdminAuthGuard)
  @Post("login")
  @HttpCode(200)
  public async login(
    @Request() req,
    @Body() loginUseDot: LoginUserDto
  ): Promise<AuthenticatedUser> {
    const loggg = await this.authService.login(req.user)
    return loggg;
  }

  @ApiResponse({
    type: ResponseMessage,
  })
  @Post("password-request")
  public async passwordResetRequest(
    @Body() passwordRequestDto: PasswordRequestResetDto
  ): Promise<ResponseMessage> {
    return this.userService.passwordRequestReset(passwordRequestDto.email);
  }

  @ApiResponse({
    type: ResponseMessage,
  })
  @Post("password-reset")
  public async passwordReset(
    @Body() passwordResetDto: PasswordResetDto
  ): Promise<ResponseMessage> {
    if (passwordResetDto.password !== passwordResetDto.passwordConfirm)
      throw new UnprocessableEntityException(
        `Password and confirmation password must match`
      );
    return this.userService.passwordResetFromResetToken(
      passwordResetDto.password,
      passwordResetDto.code
    );
  }

  @ApiResponse({
    type: AuthenticatedUser,
  })
  @Post("token")
  @HttpCode(200)
  public async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto
  ): Promise<AuthenticatedUser> {
    return this.authService.refreshToken(
      refreshTokenDto.accessToken,
      refreshTokenDto.refreshToken
    );
  }
}
