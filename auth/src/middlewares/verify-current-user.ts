import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface IUserPayload {
  id: string;
  email: string;
}
// this is how i would augment the Request interface, but below is an interesting alternative
// interface IRequest extends Request {
//   currentUser?: IUserPayload
// }

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload
    }
  }
}

export const verifyCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next()
  } else {
    try {
      const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as IUserPayload
      req.currentUser = payload
    } catch (error) {}
  }
  next()
}
