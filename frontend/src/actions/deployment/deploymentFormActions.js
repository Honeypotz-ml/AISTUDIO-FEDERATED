import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'DEPLOYMENT_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'DEPLOYMENT_FORM_FIND_STARTED',
      });

      axios.get(`/deployment/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'DEPLOYMENT_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'DEPLOYMENT_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/deployment'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'DEPLOYMENT_FORM_CREATE_STARTED',
      });

      axios.post('/deployment', { data: values }).then(res => {
        dispatch({
          type: 'DEPLOYMENT_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Deployment created' });
        dispatch(push('/admin/deployment'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'DEPLOYMENT_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'DEPLOYMENT_FORM_UPDATE_STARTED',
      });

      await axios.put(`/deployment/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'DEPLOYMENT_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Deployment updated' });
        dispatch(push('/admin/deployment'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'DEPLOYMENT_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
