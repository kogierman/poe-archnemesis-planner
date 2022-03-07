import { useState } from 'react'
import './App.css'
import CentralView from './CentralView'
import SideBar from './SideBar'
import Stats from './Stats'
import TopBar from './TopBar'

function App() {
  const [currentIdx, setCurrentIdx] = useState(1)
  const [selected, setSelected] = useState({ 1: {}, 2: {}, 3: {}, 4: {} })

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
      <TopBar />
      <SideBar select={selectForCurrentIndex} selected={selected} />
      <CentralView
        selected={selected}
        currentIdx={currentIdx}
        setCurrentIdx={setCurrentIdx}
        deselect={deselectForIndex}
      />
      <Stats selected={selected} />
    </div>
  )
}

export default App
