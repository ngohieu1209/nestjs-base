import { Body, Controller, Get, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from 'src/shared/enums/role.enum';
import {
  JwtDecodedData,
  Public,
  Roles,
} from 'src/shared/decorators/auth.decorator';

import { AuthService } from './auth.service';
import { JwtPayload } from './dto/jwt-payload.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { RefreshTokenRequestDto, RefreshTokenResponseDto } from './dto/refresh-token.dto';
import { RegisterRequestDto, RegisterResponseDto } from './dto/register.dto';
import { RevokeUserRequestDto, RevokeUserResponseDto } from './dto/revoke-user.dto';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Login',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginResponseDto,
  })
  @Post('login')
  @Public()
  async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.authService.login(loginRequestDto);
  }

  // @Get('verify')
  // @Roles([Role.Admin])
  // verify(@JwtDecodedData() data: JwtPayload): JwtPayload {
  //   return data;
  // }

  @ApiOperation({
    summary: 'Register a new student',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RegisterResponseDto,
  })
  @Post('register')
  @Public()
  async registerStudent(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.registerStudent(registerRequestDto);
  }

  @ApiOperation({
    summary: 'Refresh token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RefreshTokenResponseDto,
  })
  @Post('refresh-token')
  @Public()
  refreshToken(
    @Body() refreshTokenRequestDto: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    return this.authService.refreshToken(
      refreshTokenRequestDto.accessToken,
      refreshTokenRequestDto.refreshToken,
    );
  }

  @ApiOperation({
    summary: 'Logout',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: LogoutResponseDto,
  })
  @Post('logout')
  async logout(
    @Req() req: Request,
    @JwtDecodedData() data: JwtPayload,
  ): Promise<LogoutResponseDto> {
    const token = req.headers.authorization.split(' ')[1];
    const logoutResult = await this.authService.logout(token, data.userId);

    return {
      logoutResult,
    };
  }

  @ApiOperation({
    summary: 'Revoke user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RevokeUserResponseDto,
  })
  @Post('revoke-user')
  @Roles([Role.Admin])
  async revokeUser(
    @Body() revokeUserRequestDto: RevokeUserRequestDto,
  ): Promise<RevokeUserResponseDto> {
    const revokeResult = await this.authService.revokeUser(
      revokeUserRequestDto.id,
    );

    return {
      revokeResult,
    };
  }
}
