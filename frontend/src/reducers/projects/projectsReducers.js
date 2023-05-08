import list from 'reducers/projects/projectsListReducers';
import form from 'reducers/projects/projectsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
