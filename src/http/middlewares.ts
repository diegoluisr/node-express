import { after } from "./middlewares/AfterMiddleware";
import { authorize } from "./middlewares/AuthMiddleware";
import { before } from "./middlewares/BeforeMiddleware";

const middlewares: { [key: string]: any } = {
  after: after,
  authorize: authorize,
  before: before
};

export const getMiddleware = (name: string) => {
  const keys = Object.keys(middlewares);
  if (keys.includes(name)) {
    return middlewares[name];
  }
  return null;
};
