import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty() accessToken: string;
  @ApiProperty() type: number;
  @ApiProperty({ default: 'bearer' }) tokenType: string = 'bearer';
  @ApiProperty() expiresIn: number | string;
  @ApiPropertyOptional() refreshToken?: string;
}