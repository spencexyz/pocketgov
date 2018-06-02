import type { EffectErrorHandlerParams } from 'redux-effex';
import ActionTypes from '../actions/types';
import submitTicket from './submitTicket';
import submitFeedback from './submitFeedback';
import submitDenverPost from './submitDenverPost';

function genericErrorHandler({ action, error }: EffectErrorHandlerParams) {
  console.log({ error });
}

export default [
  { action: ActionTypes.SUBMIT_TICKET, effect: submitTicket, error: genericErrorHandler },
  { action: ActionTypes.SUBMIT_FEEDBACK, effect: submitFeedback, error: genericErrorHandler },
  { action: ActionTypes.DENVER_POST, effect: submitDenverPost, error: genericErrorHandler },
];
