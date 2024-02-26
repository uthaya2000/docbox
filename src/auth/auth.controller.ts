import { Body, Controller, Post, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(
    @Body() signupDto: AuthDto,
    @Headers('Authorization') bearerToken: string,
  ) {
    return this.authService.signUp(signupDto, bearerToken);
  }

  @Post('login')
  login(@Body() loginDto: AuthDto) {
    return this.authService.login(loginDto);
  }
}
