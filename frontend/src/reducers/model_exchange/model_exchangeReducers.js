import list from 'reducers/model_exchange/model_exchangeListReducers';
import form from 'reducers/model_exchange/model_exchangeFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
