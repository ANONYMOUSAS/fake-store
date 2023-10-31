import { createStore, combineReducers, applyMiddleware } from 'redux';
import rootReducer from './reducers';

// You may need to add middleware (e.g., Redux Thunk) for asynchronous actions

const store = createStore(
  combineReducers({ cart: rootReducer }), // Use combineReducers if you have multiple reducers
  applyMiddleware(/* middleware goes here, if needed */)
);

export default store;
