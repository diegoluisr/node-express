import { Request, Response } from 'express';

export class AnyController {
  static async index (req:Request, res:Response):Promise<Response> {
    return res;
  }
}

export default AnyController
