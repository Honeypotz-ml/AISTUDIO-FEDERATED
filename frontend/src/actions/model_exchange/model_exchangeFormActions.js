import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'MODEL_EXCHANGE_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'MODEL_EXCHANGE_FORM_FIND_STARTED',
      });

      axios.get(`/model_exchange/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'MODEL_EXCHANGE_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'MODEL_EXCHANGE_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/model_exchange'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'MODEL_EXCHANGE_FORM_CREATE_STARTED',
      });

      axios.post('/model_exchange', { data: values }).then(res => {
        dispatch({
          type: 'MODEL_EXCHANGE_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Model_exchange created' });
        dispatch(push('/admin/model_exchange'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'MODEL_EXCHANGE_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'MODEL_EXCHANGE_FORM_UPDATE_STARTED',
      });

      await axios.put(`/model_exchange/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'MODEL_EXCHANGE_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Model_exchange updated' });
        dispatch(push('/admin/model_exchange'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'MODEL_EXCHANGE_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
