import { compare, compareSync } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import prisma from "../../lib/prisma";

export default async function Login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    // Kullanıcıyı bul
    if (!user) {
      return res.status(401).json({ message: "Email veya şifre hatalı" });
    }

    // Şifreyi kontrol et
    const isValidPassword = compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Email veya şifre hatalı" });
    }

    // Token oluştur
    const token = sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    // Kullanıcı bilgilerini gönder (şifre hariç)
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: "Giriş başarılı!",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Giriş hatası:", error);
    res.status(500).json({ message: "Giriş sırasında bir hata oluştu" });
  }
}
