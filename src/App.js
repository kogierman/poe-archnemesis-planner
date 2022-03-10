import { useState } from 'react'
import './App.css'
import CentralView from './CentralView'
import Details from './Details'
import SideBar from './SideBar'
import Stats from './Stats'
import data from './data.json'

function App() {
  const [currentIdx, setCurrentIdx] = useState(1)
  const [selected, setSelected] = useState({ 1: {}, 2: {}, 3: {}, 4: {} })
  const [hovered, setHovered] = useState(null)

  const selectForCurrentIndex = (mod) => {
    if (currentIdx < 1 || currentIdx > 4) {
      return
    }
    setSelected({
      ...selected,
      [currentIdx]: mod,
    })
    setCurrentIdx(currentIdx + 1)
  }

  const deselectForIndex = (idx) => {
    setSelected({
      ...selected,
      [idx]: {},
    })
  }

  return (
    <div className="App">
      <SideBar
        select={selectForCurrentIndex}
        selected={selected}
        setHovered={setHovered}
      />
      <div className="logo">
        <img src="./assets/logo.png" />
        <h2>PLANNER</h2>
        <Details mod={hovered} />
      </div>
      <CentralView
        selected={selected}
        currentIdx={currentIdx}
        setCurrentIdx={setCurrentIdx}
        deselect={deselectForIndex}
      />
      <Stats selected={selected} />
      <div className="devtag">version: 1.0.0</div>
    </div>
  )
}

export default App
