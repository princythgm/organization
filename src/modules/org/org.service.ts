import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { IBasicInfo } from './interfaces/basic-info.interface';
import { ICompanyInfo } from './interfaces/company-info.interface';
import { IProduct } from './interfaces/product.interface';
import { RegisterCompanyDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './token/jwt-payload.interface';
import { LoginResponseDto } from './dto/login-response.dto';
import { TokenService } from './token/token.service';
@Injectable()
export class OrgService {
    constructor(
        @Inject('BASIC_INFO_MODEL') private readonly infoModel : Model < IBasicInfo >,
        @Inject('COMPANY_INFO_MODEL') private readonly companyModel : Model < ICompanyInfo >,
        @Inject('PRODUCT_MODEL') private readonly productModel : Model < IProduct >,
        private readonly tokenService: TokenService,
    ) {}


    async registerCompany(dto: RegisterCompanyDto){
        const checkExist = await this.infoModel.findOne({status:'1', email:dto.email});
        if(checkExist){
            return {
                status: '7407',
                message: 'This company details already registered'
            };
        }
        const hashKey = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(dto.email, hashKey);
        let basicInfoDetails ={
            companyName: dto.companyName,
            headOffice: dto.headOffice,
            password:password,
            country: dto.country,
            postalCoad: dto.postalCoad,
            city: dto.city,
            countryCode: dto.countryCode,
            contactNumber: dto.contactNumber,
            webSiteUrl: dto.webSiteUrl,
            userName: dto.userName,
            designation: dto.designation,
            userCountryCode: dto.userCountryCode,
            userMobile: dto.userMobile,
            email: dto.email,
            createdOn: new Date(),
            status: '1',
        }
      const basicInfo = await new this.infoModel(basicInfoDetails).save();
      dto.companyInfo.basicInfoId = basicInfo._id;
      dto.companyInfo.createdOn = new Date();
      const companyModel = await new this.companyModel(dto.companyInfo).save();
      const productDate = dto.productInfo.map((item) => ({
        ...item,
        companyId: companyModel._id,
        createdOn: new Date()
      }));
      console.log(productDate)
      const product = await  this.productModel.insertMany(productDate, { "ordered": false });
   if(product){
    return {
        status: '7400',
        message: 'Company register successfully'
    };
   
   }

    }

    async getCompanyDate(basicInfoId : string){
       
        return await this.infoModel.aggregate([
            {
                $match:
                {
                    _id: new Types.ObjectId(basicInfoId)
                }
            },
            {
                $lookup: {
                    from: "companyinfos",
                    let: { basicInfoId: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$basicInfoId", "$$basicInfoId"] } } },
                        {
                            $lookup: {
                                from: "products",
                                let: { companyDetailsId: "$_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$companyId", "$$companyDetailsId"] } } },
                                ],
                                as: "product"
                            }
                        }
                    ],
                    as: "company"
                }
            },

        ])
    }

    async verifyOrg(login: LoginDto, ipAddress: string,): Promise<LoginResponseDto> {
        const loginResults = await this.verifyUser(login.companyName, login.passcode);

        if (!loginResults) {
            return null;
        }
        const payload: JwtPayload = {
            sub: loginResults._id,
        };
        const loginResponse: LoginResponseDto = await this.tokenService.createAccessToken(
            payload,
        );
        const tokenContent = {
            userId: loginResults._id,
            ipAddress,
        };
        const refresh = await this.tokenService.createRefreshToken(tokenContent);
        loginResponse.refreshToken = refresh;
        return loginResponse;
    }


    async verifyUser(companyName: string, password: string) {
        const organizationDetails = await this.infoModel.findOne({ status: '1', companyName: companyName });
        if (organizationDetails) {
          const validPassword = await bcrypt.compare(password, organizationDetails.password);
          if (validPassword) {
            return organizationDetails;
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
}

