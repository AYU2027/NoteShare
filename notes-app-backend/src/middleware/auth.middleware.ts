import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
      req.user = { id: decoded.id };
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};