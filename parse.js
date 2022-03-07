const { parse } = require('himalaya')
const { readFileSync, writeFileSync } = require('fs')
const html = readFileSync('toparse.html', { encoding: 'utf8' })
const _ = require('lodash')
const json = parse(html)

// const res = json[0].children
//   .filter((c) => c.type === 'element')
//   .reduce((acc, c) => {
//     const [rtier, rname, rmods, rrecipe] = c.children
//     const tier = +rtier.children[0].children[0].content
//     const name = rname.children[0].children[1].children[0].children[0].content
//     const img = rname.children[0].children[0].children[0].attributes[1].value
//     const mod = rmods.children[0].children[0].content
//     const rewards = rmods.children
//       .filter(
//         (c) => c.tagName === 'span' && c.attributes[0].value === 'currency',
//       )
//       .map((c) => c.children[0].content)
//     const specialMod = rmods.children.filter((c) => c.type === 'text')[0]
//       ?.content
//     const recipe = rrecipe.children
//       .filter((c) => c.type === 'element')
//       .map((c) => c.children[1].children[0].children[0].content)

//     const arch = {
//       tier,
//       img,
//       mod,
//       rewards,
//       recipe,
//     }

//     if (specialMod && specialMod != ' ') {
//       arch.specialMod = specialMod
//     }

//     return {
//       [name]: arch,
//       ...acc,
//     }
//   }, {})

const findNumberRE = /(\d+(?:\.\d*)?|\.\d+)/
const data = JSON.parse(readFileSync('./src/data.json'))
const stats = JSON.parse(readFileSync('./converted.json'))
stats.forEach((s) => {
  const statList = s.Stats.replaceAll('(Hidden)', '').split('\n')
  const staty = statList.map((st) => {
    if (st === 'N/A') {
      return {}
    }

    const m = st.match(findNumberRE)
    if (m) {
      return { stat: m.input.replace(m[0], '$'), value: m[0] }
    } else {
      return { stat: st }
    }
  })
  let i = data.findIndex((d) => d.name === s.Name)
  data[i].stats = staty
})

// dataNew = _.map(data, (d, name) => ({ name, ...d }))
// console.log(dataNew)
// console.log(JSON.stringify(data, null, 2))
// console.log(JSON.stringify(res, null, 2))
writeFileSync('data.json', JSON.stringify(data, null, 2))
