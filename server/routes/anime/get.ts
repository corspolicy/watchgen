import { Request, Response } from "express";
import prisma from "server/lib/prisma";

// Url yapısında gereken parametreler: animeId
export default async function Get(req: Request, res: Response) {
  let animeId = req.params.animeId;

  // İstenilen animenin kimliğinin belirtilmemesi durumunda hata döndür.
  if (!animeId)
    return res
      .status(400)
      .json({ message: "İstenilen animenin kimliği belirtilmemiş." });

  res.json(
    // Animeyi veritabanından iste
    await prisma.anime.findFirst({
      where: {
        id: animeId,
      },
      // Gönderilecek veriye animeye ait bölümleri de ekle
      include: {
        episodes: {
          // Beraberinde gönderilecek bölümlere thumbnail i de ekle
          include: {
            thumbnail: true,
          },
        },
      },
    })
  );
}
