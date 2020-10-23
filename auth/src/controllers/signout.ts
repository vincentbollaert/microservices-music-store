import { Request, Response } from "express"

export const signOut = (req: Request, res: Response) => {
  req.session = null // clear the cookie
  res.send({})
}
