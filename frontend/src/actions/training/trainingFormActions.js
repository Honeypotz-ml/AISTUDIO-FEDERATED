import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'TRAINING_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'TRAINING_FORM_FIND_STARTED',
      });

      axios.get(`/training/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'TRAINING_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'TRAINING_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/training'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'TRAINING_FORM_CREATE_STARTED',
      });

      axios.post('/training', { data: values }).then(res => {
        dispatch({
          type: 'TRAINING_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Training created' });
        dispatch(push('/admin/training'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'TRAINING_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'TRAINING_FORM_UPDATE_STARTED',
      });

      await axios.put(`/training/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'TRAINING_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Training updated' });
        dispatch(push('/admin/training'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'TRAINING_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
