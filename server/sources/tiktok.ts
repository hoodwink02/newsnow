import * as cheerio from "cheerio";
import type { NewsItem } from "@shared/types";

const trending = defineSource(async () => {
  const url = "https://ads.tiktok.com/business/creativecenter/inspiration/popular/music/pc/en";
  const html: any = await myFetch(url);
  const $ = cheerio.load(html);
  const news: NewsItem[] = [];

  $("div.tiktok-1583a5-DivContentContainer").each((_, el) => {
    const title = $(el).find("p.tiktok-18b6x59-PTitle").text();
    const author = $(el).find("p.tiktok-18b6x59-PAuthor").text();
    const videoUrl = $(el).find("a.tiktok-15s32k-ALink").attr("href");

    if (title && videoUrl) {
      news.push({
        id: videoUrl,
        title: `${title} - ${author}`,
        url: videoUrl,
      });
    }
  });

  return news;
});

export default defineSource({
  "tiktok": trending,
  "tiktok-trending": trending,
});
