import { Connection } from 'mongoose';
import { productSchema } from '../schemas/product.schema';


export const productProvider = [
  {
    provide: 'PRODUCT_MODEL',useFactory: (connection: Connection) =>connection.model('product',productSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
