import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { character } from '../../assets'
import { SPRITE_SIZE, DIRECTION, MAX_STEP } from '../../utils/constants'
import Move from '../../features/Move'

export default function Character() {
  const [facing, setFacing] = useState({ current: DIRECTION.DOWN, previous: DIRECTION.DOWN })
  const [step, setStep] = useState(0)

  const { position } = useSelector(state => state.character)

  const offset = { top: 0, left: SPRITE_SIZE * 6 }

  useEffect(() => {
    if (facing.current === facing.previous) {
      setStep(prevState => (prevState < MAX_STEP - 1 ? prevState + 1: 0))
    } else {
      setStep(0)
    }
  }, [facing])

  function handleKeydown(direction) {
    setFacing(prevState => ({
      current: direction,
      previous: prevState.current
    }))
  }

  return (
    <>
      <div 
        style={{
          position: 'absolute',
          zIndex: 5,
          top: position.top,
          left: position.left,
          width: SPRITE_SIZE,
          height: SPRITE_SIZE,
          background: 
            `url(${character.sprites}) 
              -${offset.left + step * SPRITE_SIZE}px 
              -${offset.top + facing.current}px`
        }}
      />

      <Move onKeydown={handleKeydown}/>
    </>
  )
}
