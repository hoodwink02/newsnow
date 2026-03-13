import { bench, describe } from "vitest"

const columns = {
  china: { zh: "国内" },
  world: { zh: "国际" },
  tech: { zh: "科技" },
  finance: { zh: "财经" },
  focus: { zh: "关注" },
  realtime: { zh: "实时" },
  hottest: { zh: "最热" },
}

const fixedColumnIdsArray = ["focus", "hottest", "realtime"]
const fixedColumnIdSet = new Set(fixedColumnIdsArray)

describe("Array membership check vs Set membership check", () => {
  bench("Array.includes", () => {
    Object.keys(columns).filter(id => !fixedColumnIdsArray.includes(id))
  })

  bench("Set.has", () => {
    Object.keys(columns).filter(id => !fixedColumnIdSet.has(id))
  })
})
