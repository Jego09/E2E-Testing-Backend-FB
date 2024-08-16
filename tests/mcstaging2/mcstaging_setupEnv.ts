import * as dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'staging'}`;
dotenv.config({ path: envFile });

