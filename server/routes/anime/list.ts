import { Request, Response } from "express";
import prisma from "server/lib/prisma";

export default async function List(req: Request, res: Response) {
  // Sayfayı queryden al
  let page = +(req.query.page || "0");
  // Sayfada gözükmesi istenilen eleman sayısını queryden a
  let pageSize = +(req.query.pageSize || "20");
  // Verilerin bir anda gönderilmesini engellemek adına gönderilecek eleman sayısını 50 ile sınırla
  if (+pageSize > 50) pageSize = 50;

  // TODO: Diğer filtreleme yöntemlerini ekle (episode, rating, releasedAt)
  // Anime başlığını al
  let title = req.query.title;
  // Eğer anime başlığı queryde belirtilmişse onu string türüne dönüştür
  if (title) title = "" + title;

  // Filterelenmiş maksimum eleman sayısını bul
  let itemsSize = await prisma.anime.count({ where: { title } });

  res.json({
    // TODO: Veriyi Redis kullanarak veya sunucu içerisinde doğrudan cacheleyerek filtrele
    // ? Veriyi cacheleme yöntemlerini ve cachelemenin yararlarını öğren
    // Veriyi filtreleyerek veritabanından iste
    data: await prisma.anime.findMany({
      where: { title },
      take: pageSize,
      skip: pageSize * page,
    }),
    // Sayfanın nerede olduğunu bilmesi adına pagination bilgisi gönder
    pagination: {
      page,
      pages: Math.ceil(itemsSize / pageSize),
      pageSize,
      itemsSize,
    },
  });
}
