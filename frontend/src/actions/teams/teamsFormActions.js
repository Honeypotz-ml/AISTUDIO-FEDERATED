import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'TEAMS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'TEAMS_FORM_FIND_STARTED',
      });

      axios.get(`/teams/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'TEAMS_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'TEAMS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/teams'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'TEAMS_FORM_CREATE_STARTED',
      });

      axios.post('/teams', { data: values }).then(res => {
        dispatch({
          type: 'TEAMS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Teams created' });
        dispatch(push('/admin/teams'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'TEAMS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'TEAMS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/teams/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'TEAMS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Teams updated' });
        dispatch(push('/admin/teams'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'TEAMS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
