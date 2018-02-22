import ActionType from '../actions/types';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.API_RESP:
      return { ...state, response: action.payload.response };
    default:
      return state;
  }
};
