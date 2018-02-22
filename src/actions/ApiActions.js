import ActionTypes from './types';

export default class Actions {
  static submitTicket(action) {
    return {
      type: ActionTypes.SUBMIT_TICKET,
      payload: action
    };
  }

  static updateResponse(action) {
    return {
      type: ActionTypes.API_RESP,
      payload: action
    }
  }
}
