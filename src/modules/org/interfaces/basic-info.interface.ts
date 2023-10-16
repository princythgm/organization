import { Document } from 'mongoose';
export interface IBasicInfo extends Document {
    companyName: string,
    headOffice: string,
    country: string,
    postalCoad: string,
    city: string,
    countryCode: string,
    contactNumber: string,
    webSiteUrl: string,
    userName: string,
    designation: string,
    userCountryCode: string,
    userMobile: string,
    email: string,
    password:string;
    createdOn: Date,
    status: string,
    
}
