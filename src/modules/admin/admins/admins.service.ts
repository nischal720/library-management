import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResponseStatus } from "src/common/enums/all.enum";
import { AuthHelper } from "src/common/helpers/auth.helper";
import { Admin } from "src/entities/admin.entity";
import { ResponseMessage } from "src/models/response-message.model";
import { ResourceService } from "src/modules/resource/resource.service";
import { Raw, Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { AdminUpdateDto } from "./dto/admin.update.dto";
import { AdminDto } from "./dto/admin.dto";
import { findAllByPage, Page } from "@sksharma72000/nestjs-search-page";
import { AdminSearchDto } from "./dto/admin.search.dto";
import { PageDto } from "src/common/dto/page.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly userRepo: Repository<Admin>,
    // private readonly emailService: EmailerService
    private readonly resourceService: ResourceService
  ) {
  }


  async getAll(
    pageable: PageDto,
    searchDto: AdminSearchDto
  ): Promise<Page<Admin>> {
    return findAllByPage({ repo: this.userRepo, page: pageable, queryDto: searchDto });
  }


  async add(userDto: AdminDto): Promise<Admin> {
    const { password, avatar, ...rest } = userDto
    let avatarId = null;
    if (avatar && "uid" in avatar) {
      const filename = await this.resourceService.upload(avatar)
      avatarId = filename.id;
    }
    const user = this.userRepo.create({
      ...rest,
      avatarId,
      password: await AuthHelper.hashPassword(password)
    });
    return await this.userRepo.save(user);
  }

  async getById(userId: number): Promise<Admin> {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
      relations: { avatar: true }
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(userId: number, userDto: AdminUpdateDto): Promise<Admin> {
    const userUpdate = await this.getById(userId);
    const update = await this.updateProperties(userUpdate, userDto);
    console.log(update)
    return this.userRepo.save(update);
  }


  private async updateProperties(userToUpdate: Admin, userDto: AdminUpdateDto): Promise<Admin> {
    const { password, avatar, ...rest } = userDto;
    if (avatar && "uid" in avatar) {
      const filename = await this.resourceService.upload(avatar)
      userToUpdate.avatarId = filename.id;
      delete userToUpdate.avatar
    }
    const other = {
      ...userToUpdate,
      ...rest
    }
    if (password) {
      other.password = await AuthHelper.hashPassword(password)
    }
    return this.userRepo.create(other);
  }


  public async findByEmail(email: string): Promise<Admin | undefined> {
    return (
      await this.userRepo.find({
        select: { password: true, email: true, phone: true, id: true },
        where: { email },
        take: 1,
      })
    )[0];
  }

  public async findByEmailPhone(email: string): Promise<Admin | undefined> {
    return (
      await this.userRepo.find({
        select: { password: true, email: true, phone: true, id: true },
        where: [{ email: email }, { phone: email }],
        take: 1,
      })
    )[0];
  }

  public async findByPhone(phone: string): Promise<Admin | undefined> {
    return (
      await this.userRepo.find({
        where: { phone },
        take: 1,
      })
    )[0];
  }

  public async findById(id: number): Promise<Admin | undefined> {
    return this.userRepo.findOne({ where: { id } });
  }

  public async passwordResetFromResetToken(
    password: string,
    resetToken: string
  ): Promise<ResponseMessage> {
    const user: Admin = await this.userRepo.findOne({
      where: {
        resetToken: resetToken,
        resetTokenExpiration: Raw((alias) => `${alias} > NOW()`),
      },
    });

    if (!user) {
      throw new BadRequestException("Invalid or expired reset code.");
    }

    user.password = await AuthHelper.hashPassword(password);
    user.resetToken = uuidv4();
    this.userRepo.save(user);

    return {
      status: ResponseStatus.SUCCESS,
      message: `Your password was successfully changed!`,
    } as ResponseMessage;
  }

  public async passwordRequestReset(email: string): Promise<ResponseMessage> {
    const user: Admin = await this.userRepo.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new HttpException(`Email :${email} not found!`, HttpStatus.BAD_REQUEST);
    }
    user.resetToken = uuidv4();
    user.resetTokenExpiration = AuthHelper.generateResetTokenExpiration();
    this.userRepo.save(user);
    // this.emailService.sendPasswordResetEmail(email, user.resetToken);

    return {
      status: ResponseStatus.SUCCESS,
      message: `You should receive an email with a reset link shortly!`,
    } as ResponseMessage;
  }
}
