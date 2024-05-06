import { Module } from "@nestjs/common";
import { AdminAuthModule } from "./auth/admin.auth.module";
import { BlogModule } from "./blog/blog.module";
import { PageModule } from "./page/page.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    AdminAuthModule,
    BlogModule,
    PageModule,
    UsersModule,
  ]
})
export class AdminPageModule { }
