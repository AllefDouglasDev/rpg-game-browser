export const Types = {
  RESTART: 'character/RESTART',
  SET_POSITION: 'character/SET_POSITION',
}

const INITIAL_STATE = {
  position: { top: 0, left: 0 }
}

export default function character(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.RESTART:
      return INITIAL_STATE
    case Types.SET_POSITION:
      return { ...state, position: action.payload.position }
    default:
      return state
  }
}

export const Creators = {
  restart: () => ({
    type: Types.RESTART,
    payload: {},
  }),
  setPosition: position => ({
    type: Types.SET_POSITION,
    payload: { position }
  }),
}
