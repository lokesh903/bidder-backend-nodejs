import express from "express";
import jwt from "jsonwebtoken";
import Model from "../models/index";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const SECRET = process.env.SECRET_KEY || "SAMPLE-REST-API";

interface JwtPayload {
  _id: string;
}

export const authentication = (data: object): string => {
  return jwt.sign(data, SECRET, {
    expiresIn: "30 days",
  });
};

const verifyToken = (token: string) => jwt.verify(token, SECRET) as JwtPayload;

export const verify = () =>
  async (req: express.Request, res: express.Response, next: () => void) => {
    try {
      const token = String(req.headers.authorization || req.query.token || "")
        .replace(/bearer|jwt/i, "")
        .replace(/^\s+|\s+$/g, "");
      const decoded = verifyToken(token);
      let doc = null;
      doc = await Model.User.findOne({
        _id: new ObjectId(decoded._id),
        isDeleted: false,
      }).lean();

      if (!doc) {
        return res.status(401).send({
          statusCode: 401,
          message: "INVALID_TOKEN",
          data: null,
        });
      }
      req['user'] = doc;
      next();
    } catch (error) {
      console.error(error);
      // const message =
      //   String(error.name).toLowerCase() === "error"
      //     ? error.message
      //     : "UNAUTHORIZED_ACCESS";
      return res.status(401).send(401);
    }
  };
