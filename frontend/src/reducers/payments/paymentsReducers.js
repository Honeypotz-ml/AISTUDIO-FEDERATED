import list from 'reducers/payments/paymentsListReducers';
import form from 'reducers/payments/paymentsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
