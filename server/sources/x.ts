import { TrendItem } from "@shared/types"

export default defineSource(async () => {
  const { data: items }: { data: TrendItem[] } = await myFetch("https://api.staringos.com/v1/twitter/trending")
  return items.map(item => ({
    id: item.url,
    title: item.title,
    url: item.url,
    extra: {
      info: `${item.exploreLink}`,
    },
  }))
})
