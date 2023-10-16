import { Body, Controller, Get, Ip, Param, Post, UseGuards } from '@nestjs/common';
import { OrgService } from './org.service';
import { RegisterCompanyDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('org')
export class OrgController {
    constructor(readonly orgService: OrgService) { }

    @Post('registerCompany')
    async registerCompany(@Body() registerCompanyDto: RegisterCompanyDto) {
        return await this.orgService.registerCompany(registerCompanyDto);
    }

    @Post('login')
    async login(  @Ip() userIp, @Body() login: LoginDto,
    ) {
        const loginResults = await this.orgService.verifyOrg(login, userIp);
        if (!loginResults) {
          return {
            status: '7405',
            message: 'Wrong passcode.',
          };
        }
        return {
          status: '7400',
          message: 'success',
          response: loginResults,
        };
      
    }
  

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get('getOrgDetails/:basicInfoId')
    async adminUsers(@Param('basicInfoId') basicInfoId : string) {
        const userList = await this.orgService.getCompanyDate(basicInfoId);
        if (userList) {
            return {status: '7400', message: 'Success', value: userList};
        } else {
            return {status: '7407', message: 'Faild'};
        }
    }
}
