const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');


const envFile = path.join(process.cwd(), '.env')
dotenv.config({ path: envFile });

console.log('env file', envFile)

// dotenv.config()

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    DATABASE_NAME: Joi.string().required().description('Mongo DB Database name'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    databaseName: envVars.DATABASE_NAME,
    options: {},
  },
};
