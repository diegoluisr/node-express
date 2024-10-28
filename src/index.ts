import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config({ path: [__dirname + '/./../.env', __dirname + '/./../../.env']});

const app: Express = express();
const port = process.env.PORT || 8080;


// https://blog.logrocket.com/extend-express-request-object-typescript/

app.get(
  '/test0',
  (req: Request, res: Response, next: NextFunction) => { req.params.counter = "a"; next() },
  (req: Request, res: Response, next: NextFunction) => { req.params.counter += "b"; next() },
  (req: Request, res: Response) => { res.json([req.params.counter]) }
);

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

app.get(
  '/test1',
  (req: Request, res: Response, next: NextFunction) => { req.params.counter = "a"; next() },
  (req: Request, res: Response, next: NextFunction) => { req.params.counter += "b"; next() },
  (req: Request, res: Response, next: NextFunction) => { next(); res.setHeader('counter', req.params.counter); req.params.counter = "" },
  (req: Request, res: Response) => { res.json([req.params.counter]) }
);

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function getData(data: string): Promise<any> {
  return Promise.resolve([data])
}

async function testGetData0(req: Request, res: Response) {
  return res.json(await getData("test2"));
}

app.get(
  '/test2',
  testGetData0
);

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function middleAuth(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization?.indexOf('Bearer ') === 0) {
    next();
  }
  else {
    return res.status(403).json([]);
  }
}

async function testGetData1(req: Request, res: Response) {
  middleAuth(req, res, async() => {
    return res.json(await getData("test3"));
  })
}

app.get(
  '/test3',
  testGetData1
);

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

async function getDataRecursive(counter: number): Promise<Object | Array<any>> {
  if (counter <= 0) {
    return Promise.resolve([]);
  }
  return {value:(await getDataRecursive(counter - 1))};
}

async function testGetData2(req: Request, res: Response) {
  middleAuth(req, res, async () => {
    return res.json(await getDataRecursive(20));
  })
}

app.get(
  '/test4',
  testGetData2
);

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


const getSubcontrols: Function = async () => { return []; };

async function subcontrols(subcontrolId ?: string): Promise < any > {
  return await getSubcontrols(subcontrolId);
}

const handlers = {
  getData: async (data: string) => {
    return await subcontrols(data);
  }
}

const middlewares = {
  getData: async (req: Request, res: Response) => {
    middleAuth(req, res, async (err: any) => {
      return res.json(await handlers.getData("test5"));
    })
  }
}

app.get(
  '/test5',
  middlewares.getData
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
