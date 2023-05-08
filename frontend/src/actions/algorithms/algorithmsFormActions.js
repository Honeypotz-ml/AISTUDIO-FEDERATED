import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'ALGORITHMS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'ALGORITHMS_FORM_FIND_STARTED',
      });

      axios.get(`/algorithms/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'ALGORITHMS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ALGORITHMS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/algorithms'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'ALGORITHMS_FORM_CREATE_STARTED',
      });

      axios.post('/algorithms', { data: values }).then((res) => {
        dispatch({
          type: 'ALGORITHMS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Algorithms created' });
        dispatch(push('/admin/algorithms'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ALGORITHMS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'ALGORITHMS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/algorithms/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'ALGORITHMS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Algorithms updated' });
        dispatch(push('/admin/algorithms'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ALGORITHMS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
