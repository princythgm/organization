import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, MinLength, IsNotEmpty, minLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'company name is required' })
  @ApiProperty()
  companyName: string;

  
  @IsEmail({}, { message: 'Email is invalid' })
  @ApiProperty()
  passcode: string;

}
