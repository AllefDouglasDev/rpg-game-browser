import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Creators } from '../../store/ducks/enemies'
import { SPRITE_SIZE, SCREEN_SIZE, DIRECTION } from '../../utils/constants'
import { enemies as enemiesAssets } from '../../assets'

import MapRow from './MapRow'

import Character from '../Character'
import Enemie from '../Enemie'

export default function Map() {
  const dispatch = useDispatch()
  const enemiesLength = useSelector(state => state.enemies.length)
  const { mapId } = useSelector(state => state.map)

  const { tiles, enemies } = require(`../../maps/${mapId}`)

  useEffect(() => {
    dispatch(Creators.setEnemies(enemies))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapId])

  function getCharacterInitialFacing() {
    let initialFacing = DIRECTION.DOWN
    
    switch (mapId) {
      case 1:
        initialFacing = DIRECTION.DOWN
        break
      case 2:
        initialFacing = DIRECTION.RIGHT
        break
      case 3:
        initialFacing = DIRECTION.DOWN
        break
      default:
        initialFacing = DIRECTION.DOWN
    }

    return { current: initialFacing, previous: initialFacing }
  }

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

      <Character initialFacing={getCharacterInitialFacing()}/>

      {enemiesLength > 0 && enemies.map((enemie, id) => (
        <Enemie
          key={id}
          id={id}
          maxStep={enemie.maxStep}
          sprite={enemiesAssets[enemie.name]}
          vertical={enemie.vertical}
          offset={enemie.offset}
          animationTime={enemie.animationTime}
        />
      ))}
    </div>
  )
}
