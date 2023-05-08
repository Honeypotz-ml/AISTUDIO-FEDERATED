import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'MONITORING_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'MONITORING_FORM_FIND_STARTED',
      });

      axios.get(`/monitoring/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'MONITORING_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'MONITORING_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/monitoring'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'MONITORING_FORM_CREATE_STARTED',
      });

      axios.post('/monitoring', { data: values }).then((res) => {
        dispatch({
          type: 'MONITORING_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Monitoring created' });
        dispatch(push('/admin/monitoring'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'MONITORING_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'MONITORING_FORM_UPDATE_STARTED',
      });

      await axios.put(`/monitoring/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'MONITORING_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Monitoring updated' });
        dispatch(push('/admin/monitoring'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'MONITORING_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
