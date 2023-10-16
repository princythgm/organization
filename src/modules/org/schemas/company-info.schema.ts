import { Schema } from 'mongoose';

export const companyInfoSchema = new Schema({
    basicInfoId: {type: Schema.Types.ObjectId, ref: 'basicinfo'},
    companyProfile: {type: String,required: true },
    url: {type: String, default: null },
    vision: {type: String, default: null },
    teamDetails:[
       {
        userName: {type: String, default: null },
        designation: {type: String, default: null },
        profile: {type: String, default: null },
        linkedinProfile: {type: String, default: null },
       }
    ],
    createdOn: {type: Date, default: null },
    status: { type: String, enum: ['0', '1'], default: '1' },
});
