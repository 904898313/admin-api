import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/auth.dto';
import { Public } from './public-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('login')
  login(@Body() body: loginDto) {
    return this.authService.login(body);
  }

  @Public()
  @Post('refreshToken')
  refreshToken(@Body() body) {
    return this.authService.refreshToken(body);
  }
}
