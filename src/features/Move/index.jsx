import React, { useState } from 'react'
import useEventListener from '@use-it/event-listener'
import { useSelector, useDispatch, useStore } from 'react-redux'

import { Creators as CharacterCreators } from '../../store/ducks/character'
import { Creators as EnemiesCreators } from '../../store/ducks/enemies'
import { Creators as MapCreators } from '../../store/ducks/map'
import { SPRITE_SIZE, DIRECTION, SCREEN_SIZE } from '../../utils/constants'

export default function Move({ onKeydown }) {
  const store = useStore()
  const dispatch = useDispatch()
  const { position } = useSelector(state => state.character)

  const [waitingAnimation, setWaitingAnimation] = useState(false)

  useEventListener('keydown', handleKeydown)

  function handleKeydown({ code, ctrlKey }) {
    if (code.indexOf('Arrow') === -1 || waitingAnimation) return

    const direction = DIRECTION[code.replace('Arrow', '').toUpperCase()]

    dispatchMove(direction)

    if (onKeydown) onKeydown(direction)

    const animationDelay = (ctrlKey) ? 50 : 100
    setWaitingAnimation(true)
    setTimeout(() => setWaitingAnimation(false), animationDelay)
  }

  function dispatchMove(direction) {
    const newPosition = getNewPosition(position, direction)

    const canMove = observeBoundaries(newPosition) && observeObjects(newPosition)

    if (!canMove) return

    console.log(newPosition)

    dispatch(CharacterCreators.setPosition(newPosition))
  }

  function observeObjects(newPosition) {
    const x = { top: 128, left: 32 }
    if (newPosition.top === x.top && newPosition.left === x.left) {
      goToNextLevel()
      return false
    }
    return true
  }

  async function goToNextLevel() {
    dispatch(CharacterCreators.restart())
    dispatch(EnemiesCreators.restart())
    dispatch(MapCreators.setMapId(store.getState().map.mapId + 1))
  }

  return <div />
}

export function observeBoundaries(newPosition) {
  const screenWidth = SCREEN_SIZE.WIDTH * SPRITE_SIZE
  const screenHeight = SCREEN_SIZE.HEIGHT * SPRITE_SIZE
  return (newPosition.top >= 0 && newPosition.top < screenHeight) &&
    (newPosition.left >= 0 && newPosition.left < screenWidth)
}

export function getNewPosition(position, direction) {
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