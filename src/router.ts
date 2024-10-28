import { NextFunction, Router, RouterOptions } from "express";
import { getMiddleware } from "./http/middlewares";
import AnyController from "./http/controllers/AnyController";

const options:RouterOptions = {};

export const router = Router(options);

const after = getMiddleware("after");
const authorize = getMiddleware("authorize");
const before = getMiddleware("before");


router.use(before);

router.get("/", (req, res) => { res.send("Hola mundo")});
router.use("/before", before, (req, res) => { res.send("Hola mundo") })
// router.get("/before", beforeMW, (req, res) => { });
// router.get("/before-authorize", [before, authorize], AnyController.index);
// router.get("/before-after", [before, after], AnyController.index);
// router.get("/authorize", [authorize], AnyController.index);
// router.get("/authorize-after", [authorize, after], AnyController.index);
// router.get("/after", [after], AnyController.index);
