import { Schema } from 'mongoose';

export const basicInfoSchema = new Schema({
    companyName: {type: String,  required: true,},
    headOffice: {type: String, required: true },
    country: {type: String, required: true },
    postalCoad: {type: String,required: true},
    city: {type: String,required: true },
    countryCode: {type: String, required: true },
    contactNumber: {type: String, required: true },
    webSiteUrl: {type: String, default: null },
    userName: {type: String, required: true },
    designation: {type: String, required: true },
    userCountryCode: {type: String, required: true },
    userMobile: {type: String, required: true },
    email: {type: String, required: true },
    password: {type: String, default: null  },
    createdOn: {type: Date, default: null },
    status: { type: String, enum: ['0', '1'], default: '1' },
});


