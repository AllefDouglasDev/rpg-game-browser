import React from 'react'

import Tile from '../Tile'

import './styles.css'

export default function MapRow({ row }) {
  return (
    <div className="row">
      {row.map((tile, i) => <Tile key={i} tile={tile} />)}
    </ div>
  )
} 