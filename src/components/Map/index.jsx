import React from 'react'

import { SPRITE_SIZE, SCREEN_SIZE } from '../../utils/constants'
import Character from '../Character'

export default function Map() {
  return (
    <div
      style={{
        margin: '50px auto',
        width: `${SPRITE_SIZE * SCREEN_SIZE.WIDTH}px`,
        height: `${SPRITE_SIZE * SCREEN_SIZE.HEIGHT}px`,
        border: '4px solid white',
        backgroundColor: 'green',
      }}
    >
      <Character />
    </div>
  )
}
