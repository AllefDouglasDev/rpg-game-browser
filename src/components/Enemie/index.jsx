import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'

import { Creators } from '../../store/ducks/enemies'
import { DIRECTION, SPRITE_SIZE } from '../../utils/constants'
import { useRef } from 'react'

export default function Enemie({
  id,
  maxStep,
  sprite,
  initialPosition,
  vertical = false,
  animationTime = 300,
}) {
  const direction = useRef(vertical ? DIRECTION.DOWN : DIRECTION.RIGHT)
  const [facing, setFacing] = useState({ 
    current: vertical ? DIRECTION.DOWN : DIRECTION.RIGHT, 
    previous: vertical ? DIRECTION.DOWN : DIRECTION.RIGHT 
  })
  const [step, setStep] = useState(0)
  
  const dispatch = useDispatch()
  const store = useStore()
  const enemies = useSelector(state => state.enemies)

  const offset = { top: 0, left: 0 }

  useEffect(() => {
    setInterval(() => {
      handleMove(direction.current)
    }, animationTime)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (facing.current === facing.previous) {
      setStep(prevState => (prevState < maxStep - 1 ? prevState + 1: 0))
    } else {
      setStep(0)
    }
  }, [facing, maxStep])

  useEffect(() => {
    if (step === maxStep -1) {
      if (vertical) {
        direction.current = direction.current === DIRECTION.DOWN ? DIRECTION.UP : DIRECTION.DOWN
      } else {
        direction.current = direction.current === DIRECTION.RIGHT ? DIRECTION.LEFT : DIRECTION.RIGHT
      }
    }
  }, [maxStep, step, vertical])

  function handleMove(direction) {
    const currentEnemies = store.getState().enemies

    const newEnemies = currentEnemies.map((enemie, index) => (index === id)
      ? ({...enemie, position: getNewPosition(enemie.position, direction) })
      : enemie
    )

    dispatch(Creators.setEnemies(newEnemies))

    setFacing(prevState => ({
      current: direction,
      previous: prevState.current
    }))
  }

  function getNewPosition(position, direction) {
    switch (direction) {
      case DIRECTION.DOWN:
        return {
          top: position.top + SPRITE_SIZE,
          left: position.left,
        }
      case DIRECTION.UP:
        return {
          top: position.top - SPRITE_SIZE,
          left: position.left,
        }
      case DIRECTION.RIGHT:
        return {
          top: position.top,
          left: position.left + SPRITE_SIZE,
        }
      case DIRECTION.LEFT:
        return {
          top: position.top,
          left: position.left - SPRITE_SIZE,
        }
      default:
        return position
    }
  }

  return (
    <>
      <div 
        style={{
          position: 'absolute',
          zIndex: 5,
          top: enemies[id] !== undefined ? enemies[id].position.top : initialPosition.top,
          left: enemies[id] !== undefined ? enemies[id].position.left : initialPosition.left,
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
