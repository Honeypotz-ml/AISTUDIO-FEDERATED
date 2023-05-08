import list from 'reducers/teams/teamsListReducers';
import form from 'reducers/teams/teamsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
