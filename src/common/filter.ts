// 自定义过滤器
import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as dayjs from 'dayjs';

// 全局异常响应过滤器
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // exception： 当前正在处理的响应对象
    // host：执行上下文程序对象
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status, res;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      res = exception.getResponse();
    } else {
      status = 500;
      res = '未知错误';
    }

    response.status(status).json({
      statusCode: status,
      message: res,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      path: request.originalUrl,
    });
  }
}
