import { useState } from 'react'
import './index.css'
import * as _ from 'lodash'
const tierStyles = {
  1: 'normal',
  2: 'magic',
  3: 'gem',
  4: 'quest',
}

function SideListItem({ mod, select, selected, onMouseEnter, onMouseLeave }) {
  const isSelected = _.some(selected, (s) => s.name === mod.name)
  const isPartOfRecipe = _.some(selected, (s) => mod.recipe?.includes(s.name))
  return (
    <div
      className={`item-box -${tierStyles[mod.tier]} open ${
        isPartOfRecipe ? 'recipe' : ''
      }`}
      style={{
        display: isSelected ? 'none' : 'block',
      }}
      onClick={() => select(mod)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={mod.img} />
      <div className={`header -single`}>{mod.name}</div>
    </div>
  )
}

export default SideListItem
