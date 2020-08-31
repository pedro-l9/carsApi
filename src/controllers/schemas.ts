import Joi from 'joi';
export const createDriverSchema = Joi.object({
  name: Joi.string().required(),
}).options({ stripUnknown: true });

export const updateDriverSchema = Joi.object({
  name: Joi.string(),
})
  .options({ stripUnknown: true })
  .or('name');

export const createCarSchema = Joi.object({
  plate: Joi.string().alphanum().required(),
  color: Joi.string().required(),
  brand: Joi.string().required(),
}).options({ stripUnknown: true });

export const updateCarSchema = Joi.object({
  plate: Joi.string().alphanum(),
  color: Joi.string(),
  brand: Joi.string(),
})
  .options({ stripUnknown: true })
  .or('plate', 'color', 'brand');

export const createUsageSchema = Joi.object({
  driverId: Joi.number().required(),
  carId: Joi.number().required(),
  description: Joi.string().required(),
}).options({ stripUnknown: true });
