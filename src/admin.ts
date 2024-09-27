import { statuscoded } from "./statuscode";
import Express, { Request, Response } from "express";
export const admin = {
  id: 123,
  password: "welcome",
};
export const isAdmin = (req: Request, res: Response, next: Function) => {
  // console.log(req.body.password);
  if (req.body.password === admin.password) {
    next();
    // return true;
  }
  res.status(statuscoded.UNAUTHORIZED).send("Unauthorized Access");
  // return false;
};
