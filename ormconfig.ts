import * as dotenv from 'dotenv';
import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();

const postgresTypeOrmConfig: PostgresConnectionOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    ssl: true,
    logging: false,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
        entitiesDir: 'dir/entity',
        migrationsDir: 'dir/migration',
        subscribersDir: 'dir/subscriber'
    }
};

export default postgresTypeOrmConfig;
