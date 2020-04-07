export const Types = {
  RESTART: 'enemies/RESTART',
  SET_ENEMIES: 'enemies/SET_ENEMIES',
  SET_POSITIONS: 'enemies/SET_POSITIONS',
}

const INITIAL_STATE = {
  enemies: [],
  positions: []
}

export default function character(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.RESTART:
      return INITIAL_STATE
    case Types.SET_ENEMIES:
      return { ...state, enemies: action.payload.enemies }
    case Types.SET_POSITIONS:
      return { ...state, positions: action.payload.positions }
    default:
      return state
  }
}

export const Creators = {
  restart: () => ({
    type: Types.RESTART,
    payload: {},
  }),
  setEnemies: enemies => ({
    type: Types.SET_ENEMIES,
    payload: { enemies }
  }),
  setPositions: positions => ({
    type: Types.SET_POSITIONS,
    payload: { positions }
  }),
}
