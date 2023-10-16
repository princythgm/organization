import { Connection } from 'mongoose';
import { basicInfoSchema } from '../schemas/basic-info.schema';


export const basicInfoProvider = [
  {
    provide: 'BASIC_INFO_MODEL',useFactory: (connection: Connection) =>connection.model('basicinfo',basicInfoSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
