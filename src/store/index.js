import { createStore, combineReducers, applyMiddleware } from 'redux'
import saga from 'redux-saga'
import createLogger from 'redux-logger'

import login from '../store/login/reducer'

import rootSaga from '../sagas'

// 创建reducer
const rootReducer = combineReducers({ login })

const middlewares = []
// 创建中间件saga
const sagaMiddleware = saga()
middlewares.push(sagaMiddleware)

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger()
  middlewares.push(logger)
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

function createDefaultStore(initialsState) {
  return createStoreWithMiddleware(rootReducer, initialsState)
}
const store = createDefaultStore()

sagaMiddleware.run(rootSaga)

export default store
