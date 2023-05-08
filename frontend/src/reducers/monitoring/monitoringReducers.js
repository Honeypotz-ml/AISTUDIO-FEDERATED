import list from 'reducers/monitoring/monitoringListReducers';
import form from 'reducers/monitoring/monitoringFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
