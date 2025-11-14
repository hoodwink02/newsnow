import * as cheerio from "cheerio";
import type { NewsItem } from "@shared/types";

const trending = defineSource(async () => {
  const baseURL = "https://www.reddit.com";
  const html: any = await myFetch("https://www.reddit.com/r/all/");
  const $ = cheerio.load(html);
  const news: NewsItem[] = [];

  $("div[data-testid='post-container']").each((_, el) => {
    const title = $(el).find("h3").text();
    const url = $(el).find("a[data-testid='outbound-link']").attr("href");
    const subreddit = $(el).find("a[data-testid='subreddit-name']").text();
    const votes = $(el).find("div[id^='vote-arrows']").text();

    if (title && url) {
      news.push({
        id: url,
        title,
        url,
        extra: {
          info: `${subreddit} · ${votes}`,
        },
      });
    }
  });

  return news;
});

export default defineSource({
  "reddit": trending,
  "reddit-trending": trending,
});
