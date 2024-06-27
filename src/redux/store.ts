// store.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import counterReducer from './slices/counterSlice';
import rootSaga from './saga';

// Combine reducers if you have multiple slices
const rootReducer = combineReducers({
  counter: counterReducer,
});

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create store instance
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware)
});

// Run the saga
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
