import { Document } from 'mongoose';
export interface IProduct extends Document {
    companyId: string,
    productName: string,
    productDescription: string,
    productLink: string,
    createdOn: Date,
    status:string,
    
}
