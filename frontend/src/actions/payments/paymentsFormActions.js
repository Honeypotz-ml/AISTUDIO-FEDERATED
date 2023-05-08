import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'PAYMENTS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'PAYMENTS_FORM_FIND_STARTED',
      });

      axios.get(`/payments/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'PAYMENTS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PAYMENTS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/payments'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'PAYMENTS_FORM_CREATE_STARTED',
      });

      axios.post('/payments', { data: values }).then((res) => {
        dispatch({
          type: 'PAYMENTS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Payments created' });
        dispatch(push('/admin/payments'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PAYMENTS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'PAYMENTS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/payments/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'PAYMENTS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Payments updated' });
        dispatch(push('/admin/payments'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PAYMENTS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
