import { Schema, Types } from 'mongoose';

export const productSchema = new Schema({
    companyId: {type: Schema.Types.ObjectId, ref: 'companyinfo' },
    productName: {type: String, required: true },
    productDescription: {type: String, required: true },
    productLink: {type: String, default: null },
    createdOn: {type: Date, default: null },
    status: { type: String, enum: ['0', '1'], default: '1' },
});


