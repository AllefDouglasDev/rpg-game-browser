import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Creators } from '../../store/ducks/enemies'
import { DIRECTION, SPRITE_SIZE } from '../../utils/constants'

export default function Enemie({
  id,
  maxStep,
  sprite,
  initialPosition,
}) {
  const [facing, setFacing] = useState({ current: DIRECTION.DOWN, previous: DIRECTION.DOWN })
  const [step, setStep] = useState(0)
  
  const dispatch = useDispatch()
  const { enemies, positions } = useSelector(state => state.enemies)

  const offset = { top: 0, left: 0 }

  useEffect(() => {
    dispatch(Creators.setEnemies([...enemies, id]))
    dispatch(Creators.setPositions([...positions, initialPosition]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (facing.current === facing.previous) {
      setStep(prevState => (prevState < maxStep - 1 ? prevState + 1: 0))
    } else {
      setStep(0)
    }
  }, [facing, maxStep])

  function handleMove(direction) {
    console.log(direction)
    const newPoitions = positions.map((p, i) => i === id ? ({ top: direction / SPRITE_SIZE, left: positions}) : p)
    dispatch(Creators.setPositions(newPoitions))
    setFacing(prevState => ({
      current: direction,
      previous: prevState.current
    }))
  }

  // const dir = useRef(0)

  // setTimeout(() => {
  //   handleMove(dir.current)
  //   if (dir.current < maxStep) {
  //     dir.current = dir.current + SPRITE_SIZE
  //   } else {
  //     dir = 0
  //   }
  // }, 1000)

  return (
    <>
      <div 
        style={{
          position: 'absolute',
          zIndex: 5,
          top: positions[id] !== undefined ? positions[id].top : initialPosition.top,
          left: positions[id] !== undefined ? positions[id].left : initialPosition.left,
          width: SPRITE_SIZE,
          height: SPRITE_SIZE,
          background: 
            `url(${sprite}) 
              -${offset.left + step * SPRITE_SIZE}px 
              -${offset.top + facing.current}px`
        }}
      />
    </>
  )
}
