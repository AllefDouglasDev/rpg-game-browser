export const Types = {
  RESTART: 'enemies/RESTART',
  SET_ENEMIES: 'enemies/SET_ENEMIES',
}

const INITIAL_STATE = []

export default function enemies(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.RESTART:
      return INITIAL_STATE
    case Types.SET_ENEMIES:
      return action.payload.enemies
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
}
