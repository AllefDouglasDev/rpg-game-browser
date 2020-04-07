import OBJECTS from './objects'

const SPRITE_SIZE = 32

const DIRECTION = {
  DOWN: 0,
  LEFT: SPRITE_SIZE * 1,
  RIGHT: SPRITE_SIZE * 2,
  UP: SPRITE_SIZE * 3,
}

const MAX_STEP = 3

const SCREEN_SIZE = {
  WIDTH: 40,
  HEIGHT: 20,
}

export {
  SPRITE_SIZE,
  DIRECTION,
  MAX_STEP,
  SCREEN_SIZE,
  OBJECTS,
}
