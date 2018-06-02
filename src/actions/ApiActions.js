import ActionTypes from './types';

export default class Actions {
  static submitTicket(action) {
    return {
      type: ActionTypes.SUBMIT_TICKET,
      payload: action
    }
  }

  static submitFeedback(action) {
    return {
      type: ActionTypes.SUBMIT_FEEDBACK,
      payload: action
    }
  }

  static updateResponse(action) {
    return {
      type: ActionTypes.API_RESP,
      payload: action
    }
  }

  static feedbackResp(action) {
    return {
      type: ActionTypes.FEEDBACK_RESP,
      payload: action
    }
  }

  static submitDenverPost(action) {
    return {
      type: ActionTypes.DENVER_POST,
      payload: action
    }
  }

  static denverPostResp(action) {
    return {
      type: ActionTypes.DENVER_POST_RESP,
      payload: action
    }
  }
}
