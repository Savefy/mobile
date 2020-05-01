import { actions as exempleActions } from '../ducks/exemple';

export const setExempleData = ({ data }) => {
  return async (dispatch, getState) => {
    // bla bla bla aqui
    dispatch(exempleActions.setData(data));
  };
};
