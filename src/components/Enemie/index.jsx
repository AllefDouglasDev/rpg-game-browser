import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'

import { Creators } from '../../store/ducks/enemies'
import { DIRECTION, SPRITE_SIZE } from '../../utils/constants'
import { getNewPosition } from '../../features/Move'

export default function Enemie({
  id,
  maxStep,
  sprite,
  initialPosition,
  vertical = false,
  animationTime = 300,
  offset = { top: 0, left: 0 }
}) {
  const mounted = useRef(false)
  const direction = useRef(vertical ? DIRECTION.DOWN : DIRECTION.RIGHT)
  const [facing, setFacing] = useState({ 
    current: vertical ? DIRECTION.DOWN : DIRECTION.RIGHT, 
    previous: vertical ? DIRECTION.DOWN : DIRECTION.RIGHT 
  })
  const [step, setStep] = useState(0)
  
  const dispatch = useDispatch()
  const store = useStore()
  const enemies = useSelector(state => state.enemies)

  useEffect(() => {
    mounted.current = true

    const interval = setInterval(() => {
      if (mounted.current) {
        handleMove(direction.current)
      }
    }, animationTime)

    return () => {
      clearInterval(interval)
      mounted.current = false
    }
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
