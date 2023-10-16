
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';



export class companyInfo {
    @IsNotEmpty()
    @ApiProperty()
    companyProfile: string;

    @ApiProperty()
    url: string;

    @ApiProperty()
    vision: string;

    @ApiProperty()
    teamDetails:any[];

    basicInfoId: string;
    createdOn : Date;
       
}

export class ProductInfoDto {
    @IsNotEmpty()
    @ApiProperty()
    productName: string;

    @IsNotEmpty()
    @ApiProperty()
    productDescription: string;

    @IsNotEmpty()
    @ApiProperty()
    productLink: string; 

    companyId: string;
    createdOn : Date;
}


export class RegisterCompanyDto {
    @IsNotEmpty()
    @ApiProperty()
    companyName: string;

    @IsNotEmpty()
    @ApiProperty()
    headOffice: string;

    @IsNotEmpty()
     @ApiProperty()
    country: string;

    @IsNotEmpty()
     @ApiProperty()
    postalCoad: string;

    @IsNotEmpty()
     @ApiProperty()
    city: string;

    @IsNotEmpty()
     @ApiProperty()
    countryCode: string;

    @IsNotEmpty()
     @ApiProperty()
    contactNumber: string;

    @IsNotEmpty()
     @ApiProperty()
    webSiteUrl: string;

    @IsNotEmpty()
     @ApiProperty()
    userName: string;

    @IsNotEmpty()
     @ApiProperty()
    designation: string;

    @IsNotEmpty()
     @ApiProperty()
    userCountryCode: string;

    @IsNotEmpty()
     @ApiProperty()
    userMobile: string;

    @IsNotEmpty()
     @ApiProperty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
     @ApiProperty()
    companyInfo: companyInfo;

    @IsNotEmpty()
    @ApiProperty()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ProductInfoDto)
    @ApiProperty({ type: [ProductInfoDto] })
    productInfo: ProductInfoDto[];
}


