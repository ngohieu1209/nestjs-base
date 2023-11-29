import { registerAs } from '@nestjs/config';
import { AuthConfig } from './config.type';
import { IsString } from 'class-validator';
import validateConfig from 'src/shared/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  JWT_ACCESS_TOKEN_SECRET: string;

  @IsString()
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: string;

  @IsString()
  JWT_REFRESH_TOKEN_SECRET: string;

  @IsString()
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;
}

export default registerAs<AuthConfig>('auth', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    accessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessExpires: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    refreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refreshExpires: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  };
});
