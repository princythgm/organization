import { Module } from '@nestjs/common';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';
import { basicInfoProvider } from './providers/basic-info.provider';
import { companyInfoProvider } from './providers/company-info.provider';
import { productProvider } from './providers/product.provider';
import { DatabaseModule } from 'src/database/database.module';
import { TokenService } from './token/token.service';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports:[DatabaseModule,],
  controllers: [OrgController],
  providers: [OrgService,TokenService,JwtStrategy, ...basicInfoProvider, ...companyInfoProvider, ...productProvider],
  exports : [OrgService]
})
export class OrgModule {}
