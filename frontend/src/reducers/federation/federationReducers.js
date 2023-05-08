import list from 'reducers/federation/federationListReducers';
import form from 'reducers/federation/federationFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
