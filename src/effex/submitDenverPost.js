import ApiActions from '../actions/ApiActions';
import CONFIG from '../../config';

export default async function submitDenverPost({action, dispatch, getState}: EffectParams) {
  const data = action.payload;
  try {
    let post = await fetch(CONFIG.POST_ZAP, {
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
      dispatch(ApiActions.denverPostResp({ response: 'We got your message!', status: 'success' }));
    } else {
      dispatch(ApiActions.denverPostResp({ response: 'Something went wrong!', status: 'fail' }));
    }

  } catch(error) {
    throw('There was an issue sending us your feedback!', error);
  }
}
