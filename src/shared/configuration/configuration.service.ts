import { Injectable } from '@nestjs/common';
import { Configuration } from './configuration.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  private environmentHosting: string = 'development';

  constructor(private readonly configService: ConfigService) { }

  get isDevelopment(): boolean {
    return this.environmentHosting === 'development';
  }

  get port(): string | number {
    return this.configService.get<string>(Configuration.PORT) || 3000;
  }

  get(name: string): string {
    return this.configService.get<string>(name);
  }

  get mongoUri(): string {
    return this.configService.get<string>(Configuration.MONGO_URL);
  }

  get JWT() {
    return {
      Key: 'JWT_KEY',
      AccessTokenTtl: 5 * 60, // 5m
      RefreshTokenTtl: 1, // 1 Days
    };
  }

}
