import list from 'reducers/training/trainingListReducers';
import form from 'reducers/training/trainingFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
