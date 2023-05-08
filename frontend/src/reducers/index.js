import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import algorithms from 'reducers/algorithms/algorithmsReducers';

import teams from 'reducers/teams/teamsReducers';

import federation from 'reducers/federation/federationReducers';

import projects from 'reducers/projects/projectsReducers';

import payments from 'reducers/payments/paymentsReducers';

import training from 'reducers/training/trainingReducers';

import deployment from 'reducers/deployment/deploymentReducers';

import monitoring from 'reducers/monitoring/monitoringReducers';

import model_exchange from 'reducers/model_exchange/model_exchangeReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    algorithms,

    teams,

    federation,

    projects,

    payments,

    training,

    deployment,

    monitoring,

    model_exchange,
  });
