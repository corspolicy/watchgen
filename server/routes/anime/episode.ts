import { Request, Response } from "express";
import prisma from "server/lib/prisma";

// ? (Soru): Neden episode diye ayrı bir uçnokta ekliyoruz, get uçnoktasında zaten bölümleri göndermiyor muyuz????
// * (Cevap): Evet gönderiyoruz fakat gönderdiğimiz sadece bölümler buna ait videoları göndermiyoruz eğer istersek
// * videoları da dahil edebiliriz ama bu seferde sunucu tarafında bant genişliğini konusunda sıkıntılarımız olucaktır
export default async function Episode(req: Request, res: Response) {
  let episodeId = req.params.episodeId;

  if (!episodeId)
    return res
      .status(400)
      .json({ message: "İstenilen bölüm kimliği belirtilmemiş." });

  res.json(
    await prisma.episode.findFirst({
      where: {
        id: episodeId,
      },
      include: {
        thumbnail: true,
        video: true,
      },
    })
  );
}
