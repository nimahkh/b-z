import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'your_jwt_secret';

export const basicAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      username: string;
    };
    req.user = { id: decoded.userId, username: decoded.username };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
