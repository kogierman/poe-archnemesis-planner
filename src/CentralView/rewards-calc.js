import _ from 'lodash'
import data from '../data.json'

const transformations = {
  'Rewards are doubled': (r) => r.concat(r),
  'All Reward Types are Uniques': (r) => r.map(() => 'uniques'),
  'All Reward Types are Divination Cards': (r) =>
    r.map(() => 'divinationCards'),
  'All Reward Types are Currency': (r) => r.map(() => 'currency'),
  'All Reward Types have an additional reward': (r) =>
    _.chain(r)
      .countBy(_.identity)
      .reduce((acc, v, k) => ({ ...acc, [k]: v + 1 }), {})
      .map((v, k) => {
        return new Array(v).fill(k)
      })
      .flatten()
      .value(),
}

export function rewardsCalc(selected) {
  return _.chain(selected)
    .reduce(
      (acc, s) => {
        if (_.isEmpty(s)) {
          return acc
        }
        const drop = acc.rewards.concat(s.rewards)
        const mod = s.specialMod
        if (mod) {
          acc.mods = acc.mods.concat(mod)
        }
        const moddedDrop = acc.mods.reduce((a, mod) => {
          const transform = transformations[mod] || _.identity
          return transform(a)
        }, drop)
        return {
          ...acc,
          rewards: acc.rewards.concat(moddedDrop),
        }
      },
      {
        mods: [],
        rewards: [],
      },
    )
    .get('rewards')
    .countBy(_.identity)
    .value()
}

export function recipesCalc(selected) {
  return _.filter(
    data,
    (d) =>
      !_.isEmpty(d.recipe) &&
      _.isEmpty(
        _.difference(
          d.recipe,
          _.map(selected, (s) => s.name),
        ),
      ),
  )
}
