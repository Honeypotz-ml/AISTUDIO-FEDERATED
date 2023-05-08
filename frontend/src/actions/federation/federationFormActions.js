import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'FEDERATION_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'FEDERATION_FORM_FIND_STARTED',
      });

      axios.get(`/federation/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'FEDERATION_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'FEDERATION_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/federation'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'FEDERATION_FORM_CREATE_STARTED',
      });

      axios.post('/federation', { data: values }).then(res => {
        dispatch({
          type: 'FEDERATION_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Federation created' });
        dispatch(push('/admin/federation'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'FEDERATION_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'FEDERATION_FORM_UPDATE_STARTED',
      });

      await axios.put(`/federation/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'FEDERATION_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Federation updated' });
        dispatch(push('/admin/federation'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'FEDERATION_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
