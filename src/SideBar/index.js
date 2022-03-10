import './index.css'
import { useState } from 'react'
import data from '../data.json'
import * as _ from 'lodash'
import SideBarItem from '../SideBarItem'

function SideBar({ select, selected, setHovered }) {
  const [list, setList] = useState(data)
  const [showShort, setShowShort] = useState(true)

  const filterList = (text) => {
    setList(
      data.filter((li) => {
        return (
          li.name.toLowerCase().includes(text) ||
          li.specialMod?.toLowerCase().includes(text) ||
          _.some(li.rewards, (r) => r.toLowerCase().includes(text))
        )
      }),
    )
  }
  return (
    <div className="sidebar">
      <div className="list">
        <div className="header -normal">Tier 1</div>
        {list
          .filter((m) => m.tier === 1)
          .map((mod) => {
            return (
              <SideBarItem
                select={select}
                mod={mod}
                data={data}
                selected={selected}
                collapsed={showShort}
                onMouseEnter={() => setHovered(mod)}
                onMouseLeave={() => setHovered(null)}
              />
            )
          })}
      </div>
      <div className="list">
        <div className="header -magic">Tier 2</div>
        {list
          .filter((m) => m.tier === 2)
          .map((mod) => {
            return (
              <SideBarItem
                select={select}
                mod={mod}
                data={data}
                selected={selected}
                collapsed={showShort}
                onMouseEnter={() => setHovered(mod)}
                onMouseLeave={() => setHovered(null)}
              />
            )
          })}
      </div>
      <div className="list">
        <div className="header -gem">Tier 3</div>

        {list
          .filter((m) => m.tier === 3)
          .map((mod) => {
            return (
              <SideBarItem
                select={select}
                mod={mod}
                data={data}
                selected={selected}
                collapsed={showShort}
                onMouseEnter={() => setHovered(mod)}
                onMouseLeave={() => setHovered(null)}
              />
            )
          })}
      </div>
      <div className="list">
        <div className="header -quest">Tier 4</div>

        {list
          .filter((m) => m.tier === 4)
          .map((mod) => {
            return (
              <SideBarItem
                select={select}
                mod={mod}
                data={data}
                selected={selected}
                collapsed={showShort}
                onMouseEnter={() => setHovered(mod)}
                onMouseLeave={() => setHovered(null)}
              />
            )
          })}
      </div>
      <div className="searchbox">
        <div className="header -normal">
          Search (by name, special mod or rewards)
        </div>
        <input
          className="input"
          placeholder="search..."
          onChange={(event) => filterList(event.target.value.toLowerCase())}
        />
      </div>
    </div>
  )
}

export default SideBar
