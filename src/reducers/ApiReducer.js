import ActionType from '../actions/types';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.API_RESP:
      return {
        ...state,
        response: action.payload.response,
      };
    case ActionType.FEEDBACK_RESP:
      return {
        ...state,
        feedbackResp: action.payload.response,
        status: action.payload.status,
      };
    case ActionType.DENVER_POST_RESP:
      return {
        ...state,
        dpResp: action.payload.response,
        dpStatus: action.payload.status
      }
    default:
      return state;
  }
};
