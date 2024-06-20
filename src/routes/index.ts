import express from "express";

import userRoute from "./userRoute";

const router = express.Router();

export default (): express.Router => {
  userRoute(router);

  return router;
};
