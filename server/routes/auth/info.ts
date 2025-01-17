import { Request, Response } from "express";

export default async function Info(req: Request, res: Response) {
  res.json(req.user);
}
