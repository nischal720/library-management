import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthHelper } from "src/common/helpers/auth.helper";
import { ResponseMessage } from "src/models/response-message.model";
import { EmailerService } from "src/common/services/emailer/emailer.service";
import { User } from "src/entities/user.entity";
import { Raw, Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { UserSearchDto } from "./dto/user.search.dto";
import { findAllByPage, Page } from "@sksharma72000/nestjs-search-page";
import { PageDto } from "src/common/dto/page.dto";
import { UserDto } from "./dto/user.dto";
import { UserUpdateDto } from "./dto/user.update.dto";
import { ResponseStatus, Status } from "src/common/enums/all.enum";
import { ResourceService } from "src/modules/resource/resource.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    // private readonly emailService: EmailerService,
    private readonly resourceService: ResourceService
  ) {
  }

  async getAll(
    pageable: PageDto,
    searchDto: UserSearchDto
  ): Promise<Page<User>> {
    return findAllByPage({ repo: this.usersRepository, page: pageable, queryDto: searchDto });
  }


  async add(userDto: UserDto): Promise<User> {
    const { password, avatar, ...rest } = userDto
    let avatarId = null;
    if (avatar && "uid" in avatar) {
      const filename = await this.resourceService.upload(avatar)
      avatarId = filename.id;
    }
    const user = this.usersRepository.create({
      ...rest,
      avatarId,
      password: await AuthHelper.hashPassword(password)
    });
    return await this.usersRepository.save(user);
  }

  async getById(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
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

  async update(userId: number, userDto: UserUpdateDto): Promise<User> {
    const userUpdate = await this.getById(userId);
    const update = await this.updateProperties(userUpdate, userDto);
    console.log(update)
    return this.usersRepository.save(update);
  }


  private async updateProperties(modalToUpdate: User, userDto: UserUpdateDto): Promise<User> {
    const { password, avatar, ...rest } = userDto;
    if (avatar && "uid" in avatar) {
      const filename = await this.resourceService.upload(avatar)
      modalToUpdate.avatarId = filename.id;
      delete modalToUpdate.avatar
    }
    const other = {
      ...modalToUpdate,
      ...rest
    }
    if (password) {
      other.password = await AuthHelper.hashPassword(password)
    }
    return this.usersRepository.create(other);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return (
      await this.usersRepository.find({
        select: { password: true, email: true, phone: true, name: true, id: true },
        where: { email, status: Status.ACTIVE },
        take: 1,
      })
    )[0];
  }

  public async findByEmailPhone(email: string): Promise<User | undefined> {
    return (
      await this.usersRepository.find({
        select: { password: true, email: true, phone: true, name: true, id: true },
        where: [{ email: email, status: Status.ACTIVE }, { phone: email, status: Status.ACTIVE }],
        take: 1,
      })
    )[0];
  }

  public async findByPhone(phone: string): Promise<User | undefined> {
    return (
      await this.usersRepository.find({
        where: { phone, status: Status.ACTIVE },
        take: 1,
      })
    )[0];
  }

  public async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id, status: Status.ACTIVE } });
  }

  public async passwordResetFromResetToken(
    password: string,
    resetToken: string
  ): Promise<ResponseMessage> {
    const user: User = await this.usersRepository.findOne({
      where: {
        resetToken: resetToken,
        resetTokenExpiration: Raw((alias) => `${alias} > NOW()`),
        status: Status.ACTIVE
      },
    });

    if (!user) {
      throw new BadRequestException("Invalid or expired reset code.");
    }

    user.password = await AuthHelper.hashPassword(password);
    user.resetToken = uuidv4();
    this.usersRepository.save(user);

    return {
      status: ResponseStatus.SUCCESS,
      message: `Your password was successfully changed!`,
    } as ResponseMessage;
  }

  public async passwordRequestReset(email: string): Promise<ResponseMessage> {
    const user: User = await this.usersRepository.findOne({
      where: { email: email, status: Status.ACTIVE },
    });
    if (!user) {
      throw new HttpException(`Email :${email} not found!`, HttpStatus.BAD_REQUEST);
    }
    user.resetToken = uuidv4();
    user.resetTokenExpiration = AuthHelper.generateResetTokenExpiration();
    this.usersRepository.save(user);
    // this.emailService.sendPasswordResetEmail(email, user.resetToken);

    return {
      status: ResponseStatus.SUCCESS,
      message: `You should receive an email with a reset link shortly!`,
    } as ResponseMessage;
  }
}