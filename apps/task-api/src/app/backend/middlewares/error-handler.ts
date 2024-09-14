import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, _, res) => {
  console.error("errorHandler", err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};
