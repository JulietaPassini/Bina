import { Request, Response, NextFunction } from 'express';
import doctorsData from '../doctorsData';

export const all = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(doctorsData);
  } catch (error) {
    next(error);
  }
};