import * as cheerio from "cheerio";
import type { NewsItem } from "@shared/types";

const trending = defineSource(async () => {
  const url = "https://tweeplers.com/trends/";
  const html: any = await myFetch(url);
  const $ = cheerio.load(html);
  const news: NewsItem[] = [];

  $("table.table-bordered tbody tr").each((_, el) => {
    const title = $(el).find("td a").text();
    const trendUrl = $(el).find("td a").attr("href");
    const volume = $(el).find("td span.text-muted").text();

    if (title && trendUrl) {
      news.push({
        id: trendUrl,
        title,
        url: trendUrl,
        extra: {
          info: volume,
        },
      });
    }
  });

  return news;
});

export default defineSource({
  "x": trending,
  "x-trending": trending,
});
