import { Document } from 'mongoose';
export interface ICompanyInfo extends Document {
    companyProfile: string,
    basicInfoId: string,
    url: string,
    vision: string,
    teamDetails:any[],
    createdOn: Date,
    status:string,
    
}
