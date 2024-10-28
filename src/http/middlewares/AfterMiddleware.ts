import { NextFunction } from "express";

export function after (req: Request, res: Response, next: NextFunction): void {
  res.headers.set("X-After", "OK");
  console.log("HERE");
  next();
}
