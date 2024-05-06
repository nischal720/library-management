import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { CustomValidationPipe } from "./common/inject/error.response";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { ClassSerializerInterceptor } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public' });

  const config = new DocumentBuilder()
    .setTitle("Library Admin Backend Api")
    .setDescription("Library Admin Backend Api")
    .setVersion("2.0")
    .addBearerAuth()
    .addSecurityRequirements("Bearer")
    .build();
  const options = {
    swaggerOptions: {
      persistAuthorization: true,
      exports: true,
      authAction: {
        defaultBearerAuth: {
          name: "defaultBearerAuth",
          schema: {
            description: "Default",
            type: "http",
            in: "header",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
          value: "thisIsASampleBearerAuthToken123",
        },
      },
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, options);
  app.enableCors();
  app.useGlobalPipes(new CustomValidationPipe());
  await app.listen(5000);
}
bootstrap();
