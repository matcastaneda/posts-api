import { Request, Response, NextFunction } from 'express';

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'CastError') {
    res.status(400).json({ message: 'Id used is malformed', status: 400 });
  } else if (err.name === 'Error') {
    res.status(401).json({ message: err.message, status: 401 });
  } else {
    res.status(500).json({ message: err.message, status: 500 });
  }
};
