import * as cheerio from "cheerio";
import type { NewsItem } from "@shared/types";

const trending = defineSource(async () => {
  const url = "https://findinfluencers.net/top-instagram-accounts-by-followers/";
  const html: any = await myFetch(url);
  const $ = cheerio.load(html);
  const news: NewsItem[] = [];

  $("table.table-bordered tbody tr").each((_, el) => {
    const rank = $(el).find("td:first-child").text();
    const username = $(el).find("td:nth-child(2)").text();
    const followers = $(el).find("td:nth-child(3)").text();
    const profileUrl = $(el).find("td:nth-child(2) a").attr("href");

    if (username && profileUrl) {
      news.push({
        id: profileUrl,
        title: `${rank}. ${username}`,
        url: profileUrl,
        extra: {
          info: `${followers} followers`,
        },
      });
    }
  });

  return news;
});

export default defineSource({
  "instagram": trending,
  "instagram-trending": trending,
});
