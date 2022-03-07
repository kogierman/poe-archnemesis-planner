import _, { identity } from 'lodash'
import './index.css'
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

function CentralView({ selected, currentIdx, setCurrentIdx, deselect }) {
  const specialMods = _.map(selected, ({ specialMod }) => specialMod)
  const rewardsRaw = _.chain(selected)
    .reduce(
      (acc, s) => (_.isEmpty(s) ? acc : acc.concat(acc).concat(s.rewards)),
      [],
    )
    .value()
  const rewards = _.chain(specialMods)
    .reduce((acc, m) => {
      if (!m) {
        return acc
      }
      const transform = transformations[m] || _.identity
      return transform(
        acc,
        _.reduce(selected, (sum, s) => (_.isEmpty(s) ? sum : sum + 1), 0),
      )
    }, rewardsRaw)
    .countBy(_.identity)
    .value()

  const recipes = _.filter(
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

  return (
    <div className="central-view">
      <div className="header">Archnemesis</div>
      <div className="selector">
        <div className="content">
          <div className="modifiers">
            {_.map(selected, (s, idx) => {
              return (
                <div
                  className={`mod ${+idx === +currentIdx ? 'selected' : ''}`}
                  onClick={() => {
                    if (!_.isEmpty(s)) {
                      deselect(idx)
                    }
                    setCurrentIdx(idx)
                  }}
                >
                  {!_.isEmpty(s) && <img src={s.img} alt={s.name} />}
                  {!_.isEmpty(s) && <div className="tooltip">{s.name}</div>}
                </div>
              )
            })}
          </div>
          <span>Total rewards:</span>
          <div className="rewards">
            {_.map(rewards, (m, r) => (
              <div>
                <img src={`./assets/${r}.png`} /> {m > 1 && `x${m}`}
              </div>
            ))}
          </div>
          <div className="recipes">
            {_.map(recipes, (r) => (
              <div>
                <img src={r.img} /> {r.name}
              </div>
            ))}
          </div>
          <div className="special-mods tc -uniquemod">
            {_.map(selected, (s) => !_.isEmpty(s) && <p>{s.specialMod}</p>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CentralView
