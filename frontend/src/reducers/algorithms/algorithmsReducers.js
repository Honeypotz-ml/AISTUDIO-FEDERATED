import list from 'reducers/algorithms/algorithmsListReducers';
import form from 'reducers/algorithms/algorithmsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
