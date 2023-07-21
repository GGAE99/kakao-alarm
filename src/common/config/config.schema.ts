import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(4000),

  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),

  ACCESS_TOKEN_EXPIRE_SEC: Joi.number().required(),
  REFRESH_TOKEN_EXPIRE_SEC: Joi.number().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379).required(),

  KAKAO_OAUTH_REST_API_KEY: Joi.string().required(),
  KAKAO_OAUTH_SECRET: Joi.string().required(),
});
