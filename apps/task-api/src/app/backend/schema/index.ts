import Joi, { ObjectSchema } from 'joi';

const taskCreateSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
  user_id: Joi.string().required(),
}).unknown(true);

const taskUpdateSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
  user_id: Joi.string().required(),
}).unknown(true);

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const refreshSchema = Joi.object({
  token: Joi.string().required(),
});

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  roles: Joi.array().items(Joi.string()).optional().default([])
});

const userUpdateSchema = Joi.object({
  username: Joi.string().optional(),
  roles: Joi.array().items(Joi.string()).optional()
});

export default {
  'task/create': taskCreateSchema,
  'task/update': taskUpdateSchema,
  'user/create': userSchema,
  'user/update': userUpdateSchema,
  'login': loginSchema,
  'refresh': refreshSchema,
} as { [key: string]: ObjectSchema };
