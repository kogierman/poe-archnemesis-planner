import data from '../data.json'
import _ from 'lodash'
import './index.css'

export default function Details({ mod }) {
  if (!mod) {
    return <div />
  }
  return (
    <div className="details">
      <div className="top"></div>
      <div className="highlight">
        <span className={`tier${mod.tier}`}>{mod.name}</span>
        <span className="mod">{mod.mod}</span>
        <img src={mod.img} />

        <div className="group">
          {mod.rewards.map((r) => (
            <img src={`./assets/${r.toLowerCase()}.png`} />
          ))}
        </div>
        {mod.specialMod && <div className="group">{mod.specialMod}</div>}

        {!_.isEmpty(mod.recipe) && (
          <div className="group">
            {mod.recipe.map((r) => (
              <div className="item-recipe">
                <img src={_.find(data, (d) => d.name === r).img} />
                <br />
                <span>{r}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bot"></div>
    </div>
  )
}
