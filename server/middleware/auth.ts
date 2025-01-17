import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

declare module "express" {
  interface Request {
    user: User | null;
  }
}

export async function authMiddleware(req: Request, res: Response) {
  let splittedAuthorizationHeader = req.headers.authorization?.split(" ") || [];
  let method = splittedAuthorizationHeader[0];
  let token = splittedAuthorizationHeader[1];

  switch (method) {
    case "Bearer":
      if (!token)
        return res.status(401).json({
          success: false,
          message: "Yetkilendirme başarısız: Token bulunamadı",
        });

      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || "your-secret-key"
        ) as jwt.JwtPayload;
        req.user = await prisma.user.findFirst({ where: { id: decoded.id } });
      } catch (e) {
        return res.status(401).json({
          success: false,
          message: "Yetkilendirme başarısız: Geçersiz token",
        });
      }
      break;

    default:
      return res.status(401).json({
        success: false,
        message: "Yetkilendirme başarısız: Geçersiz Yöntem",
      });
      break;
  }
}

export function adminMiddleware(req: Request, res: Response) {
  if (req.user?.role != "Admin")
    return res.status(403).json({
      success: false,
      message: "Bu işlem için yönetici yetkisi gerekiyor",
    });
}
