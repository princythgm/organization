import { Connection } from 'mongoose';
import { companyInfoSchema } from '../schemas/company-info.schema';


export const companyInfoProvider = [
  {
    provide: 'COMPANY_INFO_MODEL',useFactory: (connection: Connection) =>connection.model('companyinfo',companyInfoSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
