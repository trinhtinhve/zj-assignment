import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number(),
  DATABASE_URL: Joi.string(),
});
