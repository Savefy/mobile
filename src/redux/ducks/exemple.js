import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';

const setData = createAction('EXEMPLE/SET_DATA');

export const actions = {
  setData,
};

const exempleHandler = handleAction(
  setData,
  (state, action) => (action.payload ? { ...action.payload } : null),
  null,
);

export const reducers = combineReducers({
  exemple: exempleHandler,
});
