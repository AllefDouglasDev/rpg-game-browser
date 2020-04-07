import { combineReducers } from 'redux'

import character from './character'
import enemies from './enemies'
import map from './map'

export default combineReducers({ character, enemies, map })
