import list from 'reducers/deployment/deploymentListReducers';
import form from 'reducers/deployment/deploymentFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
