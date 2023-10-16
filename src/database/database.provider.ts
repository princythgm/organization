import * as mongoose from 'mongoose';

import { Configuration } from 'src/shared/configuration/configuration.enum';
import { ConfigurationService } from 'src/shared/configuration/configuration.service';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (_config: ConfigurationService): Promise<typeof mongoose> =>
      await mongoose.connect(_config.get(Configuration.MONGO_URL)),
    inject: [ConfigurationService],
  },
];

