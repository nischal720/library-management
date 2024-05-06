import { Test, TestingModule } from "@nestjs/testing";
import { AdminAuthController } from "./admin.auth.controller";
import { AdminAuthService } from "./admin.auth.service";
import { AdminService } from "../admins/admins.service";
import { JwtService } from "@nestjs/jwt";

describe("Auth Controller", () => {
  let controller: AdminAuthController;
  const mockUserService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminAuthController],
      providers: [AdminAuthService, AdminService]
    }).overrideProvider([AdminAuthService,AdminService,JwtService]).useValue([mockUserService,mockUserService,{}]).compile();

    controller = module.get<AdminAuthController>(AdminAuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
