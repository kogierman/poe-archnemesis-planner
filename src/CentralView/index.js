import _ from 'lodash'
import './index.css'
import Modifiers from './modifiers'
import Bar from '../Bar'

import { rewardsCalc, recipesCalc } from './rewards-calc'

function CentralView({ selected, currentIdx, setCurrentIdx, deselect }) {
  const rewards = rewardsCalc(selected)
  const recipes = recipesCalc(selected)

  return (
    <div className="container">
      <Bar type="bar-header" />
      <div className="central-view">
        {/* <div className="header">Archnemesis monster</div> */}
        <div className="selector">
          <div className="content">
            <Modifiers
              selected={selected}
              deselect={deselect}
              setCurrentIdx={setCurrentIdx}
              currentIdx={currentIdx}
            />
            <span>Total rewards</span>
            <div className="rewards">
              {_.map(rewards, (m, r) => (
                <div>
                  <img src={`./assets/${r.toLowerCase()}.png`} />{' '}
                  {m > 1 && `x${m}`}
                </div>
              ))}
            </div>
            <div className="recipes">
              {_.map(recipes, (r) => (
                <div>
                  <img src={r.img} /> <br />
                  {r.name}
                </div>
              ))}
            </div>
            <div className="special-mods tc -normalmod">
              {_.map(selected, (s) => !_.isEmpty(s) && <p>{s.specialMod}</p>)}
            </div>
          </div>
        </div>
      </div>
      <Bar type="footer" />
    </div>
  )
}

export default CentralView
