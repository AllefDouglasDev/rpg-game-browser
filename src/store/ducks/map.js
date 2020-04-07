export const Types = {
  RESTART: 'map/RESTART',
  SET_MAP_ID: 'map/SET_MAP_ID',
}

const INITIAL_STATE = {
  mapId: 1
}

export default function map(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.RESTART:
      return INITIAL_STATE
    case Types.SET_MAP_ID:
      return { ...state, mapId: action.payload.mapId}
    default:
      return state
  }
}

export const Creators = {
  restart: () => ({
    type: Types.RESTART,
    payload: {},
  }),
  setMapId: mapId => ({
    type: Types.SET_MAP_ID,
    payload: { mapId }
  }),
}
