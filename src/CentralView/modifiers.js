import _ from 'lodash'
function Modifiers({ selected, deselect, setCurrentIdx, currentIdx }) {
  return (
    <div className="modifiers">
      {_.map(selected, (s, idx) => {
        return (
          <div>
            <div className="modlabel">
              <span>{s.name}</span>
            </div>
            <div
              className={`mod ${+idx === +currentIdx ? 'selected' : ''}`}
              onClick={() => {
                if (!_.isEmpty(s)) {
                  deselect(+idx)
                }
                setCurrentIdx(+idx)
              }}
            >
              {!_.isEmpty(s) && <img src={s.img} alt={s.name} />}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Modifiers
