import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'PROJECTS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'PROJECTS_FORM_FIND_STARTED',
      });

      axios.get(`/projects/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'PROJECTS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PROJECTS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/projects'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'PROJECTS_FORM_CREATE_STARTED',
      });

      axios.post('/projects', { data: values }).then((res) => {
        dispatch({
          type: 'PROJECTS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Projects created' });
        dispatch(push('/admin/projects'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PROJECTS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'PROJECTS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/projects/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'PROJECTS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Projects updated' });
        dispatch(push('/admin/projects'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PROJECTS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
