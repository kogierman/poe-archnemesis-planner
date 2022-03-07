import _ from 'lodash'
import './index.css'
function Stats({ selected }) {
  const stats = _.reduce(
    selected,
    (st, mod) => {
      if (!mod.stats) return st
      return mod.stats?.reduce((acc, s) => {
        acc[s.stat] = s.value ? (acc[s.stat] || 0) + +s.value : 1
        return acc
      }, st)
    },
    {},
  )
  return (
    <div className="stats">
      <div className="header">Monster stats</div>
      <div className="stats-list tc -mod">
        {_.map(stats, (s, name) => (
          <p>{name.replace('$', s)}</p>
        ))}
      </div>
    </div>
  )
}

export default Stats
