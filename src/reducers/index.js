import { createStore, combineReducers, applyMiddleware } from 'redux'
import { effectsMiddleware } from 'redux-effex'
import Effex from '../effex'
import ApiReducer from './ApiReducer'

const Store = createStore(
  combineReducers({
    apiReducer: ApiReducer,
  }),
  applyMiddleware(effectsMiddleware(Effex)),
);

export default Store;
