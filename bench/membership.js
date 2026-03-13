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

const ITERATIONS = 1_000_000

console.time("Array.includes")
for (let i = 0; i < ITERATIONS; i++) {
  Object.keys(columns).filter(id => !fixedColumnIdsArray.includes(id))
}
console.timeEnd("Array.includes")

console.time("Set.has")
for (let i = 0; i < ITERATIONS; i++) {
  Object.keys(columns).filter(id => !fixedColumnIdSet.has(id))
}
console.timeEnd("Set.has")
