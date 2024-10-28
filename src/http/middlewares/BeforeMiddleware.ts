import { NextFunction } from "express";

export function before(req: Request, res: Response, next: NextFunction): void {
  res.headers.set("X-Before", "OK");
  console.log("HERE");
  next();
}
