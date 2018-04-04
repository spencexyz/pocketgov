import ApiActions from '../actions/ApiActions';
import CONFIG from '../../config';

export default async function submitFeedback({action, dispatch, getState}: EffectParams) {
  const data = action.payload;
  try {
    let post = await fetch(CONFIG.FEEDBACK_ZAP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msg: data.msg,
        email: data.email
      })
    });

    if (post.status === 200) {
      dispatch(ApiActions.feedbackResp({ response: 'We got your message!', status: 'success' }));
    } else {
      dispatch(ApiActions.feedbackResp({ response: 'Something went wrong!', success: 'fail' }));
    }

  } catch(error) {
    throw('There was an issue sending us your feedback!', error);
  }
}
