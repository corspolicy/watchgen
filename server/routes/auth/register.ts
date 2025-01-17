import { hashSync } from "bcrypt";
import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export default async function Register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;

    let existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Bu email adresi zaten kullanılıyor" });
    }

    // Şifreyi hashle
    const hashedPassword = hashSync(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    console.log(createdUser);

    res.status(201).json(createdUser);
  } catch (error) {
    console.error("Kayıt hatası:", error);
    res.status(500).json({ message: "Kayıt sırasında bir hata oluştu" });
  }
}
