import googleTrends from "google-trends-api";
import type { NewsItem } from "@shared/types";

const trending = defineSource(async () => {
  const data = await googleTrends.dailyTrends({ geo: "US" });
  const trends = JSON.parse(data);
  const news: NewsItem[] = [];

  trends.default.trendingSearchesDays[0].trendingSearches.forEach((item: any) => {
    news.push({
      id: item.title.query,
      title: item.title.query,
      url: item.title.exploreLink,
      extra: {
        info: item.formattedTraffic,
      },
    });
  });

  return news;
});

export default defineSource({
  "google": trending,
  "google-trending": trending,
});
