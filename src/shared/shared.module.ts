import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './configuration/configuration.service';


@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    ConfigurationService,
   ],
  exports: [
    ConfigurationService, 
   ],
})
export class SharedModule { }
