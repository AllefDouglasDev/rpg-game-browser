import React from 'react'
import useEventListener from '@use-it/event-listener'
import { useSelector, useDispatch } from 'react-redux'

import { Creators } from '../../store/ducks/character'
import { SPRITE_SIZE, DIRECTION, SCREEN_SIZE } from '../../utils/constants'

export default function Move({ onKeydown }) {
  const dispatch = useDispatch()
  const { position } = useSelector(state => state.character)

  useEventListener('keydown', handleKeydown)

  function handleKeydown({ code }) {
    if (code.indexOf('Arrow') === -1) return

    const direction = DIRECTION[code.replace('Arrow', '').toUpperCase()]

    dispatchMove(direction)

    if (onKeydown) onKeydown(direction)
  }

  function dispatchMove(direction) {
    const newPosition = getNewPosition(direction)

    const canMove = observeBoundaries(newPosition)

    if (!canMove) return

    dispatch(Creators.setPosition(newPosition))
  }

  function getNewPosition(direction) {
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

  function observeBoundaries(newPosition) {
    const screenWidth = SCREEN_SIZE.WIDTH * SPRITE_SIZE
    const screenHeight = SCREEN_SIZE.HEIGHT * SPRITE_SIZE
    return (newPosition.top >= 0 && newPosition.top < screenHeight) &&
      (newPosition.left >= 0 && newPosition.left < screenWidth)
  }

  return <div />
}
