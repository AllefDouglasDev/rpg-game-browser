import React from 'react'

import { SPRITE_SIZE } from '../../../utils/constants'
import { map } from '../../../assets'

import './styles.css'

export default function Tile({ tile }) {

  const sprite = `
    url(${map.tiles}) 
    -${map.tilesOffset[tile].left}px
    -${map.tilesOffset[tile].top}px
  `

  return (
    <div
      style={{
        background: sprite,
        width: SPRITE_SIZE,
        height: SPRITE_SIZE
      }}
    />
  )
}
