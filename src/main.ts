import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ErrorFilter } from './common/filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置跨域
  app.enableCors({
    origin: '*', // 允许跨域访问的请求地址
    // methods: ['POST'],
  });

  // 注册全局管道
  app.useGlobalPipes(
    // 入参验证
    new ValidationPipe({
      stopAtFirstError: true, // 给定属性的验证将在遇到第一个错误后停止
      // -排除属性
      whitelist: true, // 排除掉非装饰器验证的属性
      // forbidNonWhitelisted: true, // 禁止无装饰器验证的数据通过
      // -类型转换
      // transform: true, // 是否自动转换输入数据类型。
      // -跳过指定类型的验证
      // skipUndefinedProperties: true, // 跳过验证对象中 undefined 的所有属性的验证。  没有该字段即为undefined
      // skipNullProperties: true, // 跳过验证对象中所有为 null 的验证。
      // -验证错误 响应
      errorHttpStatusCode: HttpStatus.BAD_REQUEST, // 此设置允许你指定在发生错误时将使用哪种异常类型。默认情况下它抛出 HttpStatus.BAD_REQUEST 即400
      // dismissDefaultMessages: true, // 验证将不会使用默认消息。如果未明确设置，错误消息始终为 undefined。
    }),
  );

  // 注册全局异常处理
  app.useGlobalFilters(new ErrorFilter());

  await app.listen(3000);
}
bootstrap();
