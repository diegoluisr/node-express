import { NextFunction } from "express";

export function authorize (req: Request, res: Response, next: NextFunction): void {
  res.headers.set("X-Authorize", "OK");
  console.log("HERE");
  next();
}
