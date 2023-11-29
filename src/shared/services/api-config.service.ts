import type { RedisClientOptions } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { JwtModuleOptions } from '@nestjs/jwt';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { COMMON_CONSTANT } from 'src/shared/constants/common.constant';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  getSqlConfig(): TypeOrmModuleOptions {
    const typeOrmConfig = {
      type: this.configService.get('database.type', { inter: true }),
      url: this.configService.get('database.url', { infer: true }),
      host: this.configService.get('database.host', { inter: true }),
      port: this.configService.get('database.port', { inter: true }),
      username: this.configService.get('database.username', { inter: true }),
      password: this.configService.get('database.password', { inter: true }),
      database: this.configService.get('database.name', { inter: true }),
      logging: this.configService.get('app.nodeEnv', { infer: true }) !== 'production',
      // ssl: { rejectUnauthorized: false },
      synchronize: false,
      autoLoadEntities: true,
      extra: {
        max: this.configService.get('database.maxConnections', { inter: true }),
      },
    };

    return typeOrmConfig as TypeOrmModuleOptions;
  }

  getJwtConfig(): JwtModuleOptions {
    return {
      secret:  this.configService.get('auth.accessSecret', { infer: true }),
      signOptions: {
        expiresIn:  this.configService.get('auth.accessExpires', { infer: true }),
      },
    };
  }

  getRedisConfig(): RedisClientOptions[] {
    return [
      {
        namespace: COMMON_CONSTANT.REDIS_DEFAULT_NAMESPACE,
        connectionName: COMMON_CONSTANT.REDIS_DEFAULT_NAMESPACE,
        url: 'redis://'
          +`${this.configService.get('redis.host', { infer: true })}:`
          +`${this.configService.get('redis.port', { infer: true })}/0`,
      },
    ];
  }
}
