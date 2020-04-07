import React from 'react'

import { SPRITE_SIZE, SCREEN_SIZE } from '../../utils/constants'
import { tiles } from '../../maps/1'
import { enemies } from '../../assets'

import MapRow from './MapRow'

import Character from '../Character'
import Enemie from '../Enemie'

export default function Map() {
  return (
    <div
      style={{
        position: 'relative',
        margin: '50px auto',
        width: `${SPRITE_SIZE * SCREEN_SIZE.WIDTH}px`,
        height: `${SPRITE_SIZE * SCREEN_SIZE.HEIGHT}px`,
        border: '4px solid white',
        backgroundColor: '#93B919',
      }}
    >
      {tiles.map((row, i) => <MapRow key={i} row={row}/>)}
      <Character />
      <Enemie
        id={1}
        initialPosition={{ top: 0, left: SPRITE_SIZE * 4 }}
        maxStep={4}
        sprite={enemies.bat}
      />
      <Enemie
        id={2}
        initialPosition={{ top: SPRITE_SIZE * 5, left: SPRITE_SIZE * 9 }}
        maxStep={4}
        sprite={enemies.bat}
      />
    </div>
  )
}
