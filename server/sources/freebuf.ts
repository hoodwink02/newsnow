import type { NewsItem } from "@shared/types"

interface FreebufArticle {
  ID: string
  post_title: string
  url: string
  content: string
  time: string
  view: string
  collection: string
  author_name: string
  author_avatar?: string
  author_url?: string
  column_name?: string
}

export default defineSource(async () => {
  const apiUrl = "https://api.freebuf.com/fapi/frontend/home/article?page=1&limit=20"

  // Use myFetch to get the JSON API directly
  // Note: in a production environment with proper IP, the WAF should allow this API request
  const response = await myFetch<any>(apiUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "Referer": "https://www.freebuf.com/",
      "Accept": "application/json, text/plain, */*",
      "Origin": "https://www.freebuf.com"
    },
  })

  // Try parsing the API response
  const articles: NewsItem[] = []
  if (response && response.data && Array.isArray(response.data.list)) {
    for (const item of response.data.list) {
      if (!item.post_title || !item.url) continue

      const article: NewsItem = {
        id: String(item.ID || item.url),
        title: item.post_title,
        url: item.url.startsWith("http") ? item.url : `https://www.freebuf.com${item.url}`,
        extra: {
          hover: item.content || item.description,
          time: item.time || item.post_date,
          author: {
            name: item.author_name || item.username,
            avatar: item.author_avatar || item.user_avatar,
          },
          stats: {
            views: Number.parseInt(item.view || "0"),
            collections: Number.parseInt(item.collection || "0"),
          },
          album: item.column_name || item.tag_name,
        },
      }
      articles.push(article)
    }
  }

  return articles
})