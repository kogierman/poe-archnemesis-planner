import './index.css'
import { useState } from 'react'
import data from '../data.json'
import * as _ from 'lodash'
import SideBarItem from '../SideBarItem'

function SideBar({ select, selected }) {
  const [list, setList] = useState(data)

  return (
    <div className="sidebar">
      <div className="header">Modifiers</div>
      <input
        className="input"
        placeholder="search..."
        onChange={(event) => {
          setList(
            data.filter((li) =>
              li.name.toLowerCase().includes(event.target.value.toLowerCase()),
            ),
          )
        }}
      ></input>
      <div className="list">
        {list.map((mod) => {
          return (
            <SideBarItem
              select={select}
              mod={mod}
              data={data}
              selected={selected}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SideBar
