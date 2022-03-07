import { useState } from 'react'
import './index.css'
import * as _ from 'lodash'
const tierStyles = {
  1: 'normal',
  2: 'magic',
  3: 'gem',
  4: 'quest',
}

function SideListItem({ mod, data, select, selected }) {
  const isSelected = _.some(selected, (s) => s.name === mod.name)
  return (
    <div
      className={`item-box -${tierStyles[mod.tier]}`}
      style={{
        display: isSelected ? 'none' : 'block',
      }}
      onClick={() => select(mod)}
    >
      <div className={`header -single`}>{mod.name}</div>
      <div className="item-stats">
        <div className="group tc -mod">{mod.mod}</div>
        <div className="group">
          {mod.rewards.map((r) => (
            <img src={`./assets/${r.toLowerCase()}.png`} />
          ))}
        </div>
        {mod.specialMod && <div className="group">{mod.specialMod}</div>}
        <div className="group">
          <img className="item-icon" src={mod.img} />
          <br />
        </div>
        {!_.isEmpty(mod.recipe) && (
          <div className="group">
            {mod.recipe.map((r) => (
              <div className="item-recipe">
                <img src={_.find(data, (d) => d.name === r).img} />
                <br />
                {r}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SideListItem
