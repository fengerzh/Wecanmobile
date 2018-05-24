// @flow

import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '../Actions/Types';

export const INITIAL_STATE = Immutable({
  facItems: [{
    id: 0,
    item_name: '',
    item_cover: '',
  }],
  fetching: false,
  error: null,
});

const request = (state: any) => {
  return state.merge({
    fetching: true,
  });
}

const success = (state: any, action: any) => {
  return state.merge({
    fetching: false,
    error: null,
    facItems: action.facItems,
  });
}

const ACTION_HANDLERS = {
  [Types.FACITEMS_REQUEST]: request,
  [Types.FACITEMS_SUCCESS]: success,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
