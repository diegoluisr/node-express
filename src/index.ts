import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { before } from "./http/middlewares/BeforeMiddleware";
// import { router } from "./router";

dotenv.config({ path: [__dirname + '/./../.env', __dirname + '/./../../.env']});

const app: Express = express();
const port = process.env.PORT || 8080;

// routes
// app.use('/', router);

app.get('/before', (req, res, next) => { next() }, (req, res, next) => { next() }, (req, res) => { res.json([]) })

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
