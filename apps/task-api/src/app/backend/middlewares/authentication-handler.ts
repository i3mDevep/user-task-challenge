import { RequestHandler } from 'express';
import { authenticationVerifyServices } from '../../injection';

export const authenticateHandler: RequestHandler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('Forbidden');
    const payload = await authenticationVerifyServices.call(
      req.headers.authorization.replace('Bearer ', '')
    );
    req.body = {
      ...payload,
      ...req.body,
      roles: payload.roles ?? req.body.roles,
    };
    next();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
