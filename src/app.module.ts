import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './utils/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SuccessInterceptor } from './common/interceptor';
import { pluginsModule } from './plugins/plugins.module';
import { AuthGuard } from './module/auth/auth.guard';
import { MenuModule } from './module/menu/menu.module';
@Module({
  imports: [
    // 环境变量
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configuration],
    }),
    // typeorm连接mysql数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DATABASE_CONFIG.HOST') || 'localhost',
          port: Number(configService.get('DATABASE_CONFIG.PORT')) || 3306,
          username: configService.get('DATABASE_CONFIG.USERNAME') || 'root',
          password: configService.get('DATABASE_CONFIG.PASSWORD') || 'jiayou11',
          database:
            configService.get('DATABASE_CONFIG.DATABASE') || 'admin_api_db',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          // logging: configService.get('datasource.logging'),
          // timezone: '+08:00', // 东八区
          // cache: {
          //   duration: 60000, // 1分钟的缓存
          // },
          // extra: {
          //   poolMax: 32,
          //   poolMin: 16,
          //   queueTimeout: 60000,
          //   pollPingInterval: 60, // 每隔60秒连接
          //   pollTimeout: 60, // 连接有效60秒
          // },
        };
      },
    }),
    // 配置jwt
    JwtModule.registerAsync({
      global: true, // 全局
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('JWT_SECRET'), // 私钥
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES_In'), // 设置 token 过期时间
          },
        };
      },
    }),
    UserModule,
    AuthModule,
    MenuModule,
    pluginsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局注册身份验证管道
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // 全局成功响应拦截
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessInterceptor,
    },
  ],
})
export class AppModule { }
