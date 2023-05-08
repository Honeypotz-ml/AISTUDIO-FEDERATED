import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress, Box, Grid } from '@mui/material';
import {
  useManagementDispatch,
  useManagementState,
} from '../../context/ManagementContext';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
// styles
import useStyles from './styles';
// components
import Widget from '../../components/Widget/Widget';

const Dashboard = () => {
  let classes = useStyles();
  const managementDispatch = useManagementDispatch();
  const managementValue = useManagementState();

  const [users, setUsers] = useState(0);
  const [algorithms, setAlgorithms] = useState(0);
  const [teams, setTeams] = useState(0);
  const [federation, setFederation] = useState(0);
  const [projects, setProjects] = useState(0);
  const [payments, setPayments] = useState(0);
  const [training, setTraining] = useState(0);
  const [deployment, setDeployment] = useState(0);
  const [monitoring, setMonitoring] = useState(0);
  const [model_exchange, setModel_exchange] = useState(0);

  const [currentUser, setCurrentUser] = useState(null);

  async function loadData() {
    const fns = [setUsers,setAlgorithms,setTeams,setFederation,setProjects,setPayments,setTraining,setDeployment,setMonitoring,setModel_exchange,];

    const responseUsers = await axios.get(`/users/count`);
    const responseAlgorithms = await axios.get(`/algorithms/count`);
    const responseTeams = await axios.get(`/teams/count`);
    const responseFederation = await axios.get(`/federation/count`);
    const responseProjects = await axios.get(`/projects/count`);
    const responsePayments = await axios.get(`/payments/count`);
    const responseTraining = await axios.get(`/training/count`);
    const responseDeployment = await axios.get(`/deployment/count`);
    const responseMonitoring = await axios.get(`/monitoring/count`);
    const responseModel_exchange = await axios.get(`/model_exchange/count`);
      Promise.all([responseUsers,responseAlgorithms,responseTeams,responseFederation,responseProjects,responsePayments,responseTraining,responseDeployment,responseMonitoring,responseModel_exchange,])
          .then((res) => res.map((el) => el.data))
          .then((data) => data.forEach((el, i) => fns[i](el.count)));
  }

  useEffect(() => {
    setCurrentUser(managementValue.currentUser);
    loadData();
  }, [managementDispatch, managementValue]);

  if (!currentUser) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <h1 className='page-title'>
        Welcome, {currentUser.firstName}! <br />
        <small>
          <small>Your role is {currentUser.role}</small>
        </small>
      </h1>
      <Grid container alignItems='center' columns={12} spacing={3}>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/users'} style={{ textDecoration: 'none' }}>
          <Widget title={'Users'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Users: <span className={classes.widgetTextCount}>{users}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/algorithms'} style={{ textDecoration: 'none' }}>
          <Widget title={'Algorithms'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Algorithms: <span className={classes.widgetTextCount}>{algorithms}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/teams'} style={{ textDecoration: 'none' }}>
          <Widget title={'Teams'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Teams: <span className={classes.widgetTextCount}>{teams}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/federation'} style={{ textDecoration: 'none' }}>
          <Widget title={'Federation'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Federation: <span className={classes.widgetTextCount}>{federation}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/projects'} style={{ textDecoration: 'none' }}>
          <Widget title={'Projects'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Projects: <span className={classes.widgetTextCount}>{projects}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/payments'} style={{ textDecoration: 'none' }}>
          <Widget title={'Payments'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Payments: <span className={classes.widgetTextCount}>{payments}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/training'} style={{ textDecoration: 'none' }}>
          <Widget title={'Training'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Training: <span className={classes.widgetTextCount}>{training}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/deployment'} style={{ textDecoration: 'none' }}>
          <Widget title={'Deployment'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Deployment: <span className={classes.widgetTextCount}>{deployment}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/monitoring'} style={{ textDecoration: 'none' }}>
          <Widget title={'Monitoring'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Monitoring: <span className={classes.widgetTextCount}>{monitoring}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/model_exchange'} style={{ textDecoration: 'none' }}>
          <Widget title={'Model_exchange'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Model_exchange: <span className={classes.widgetTextCount}>{model_exchange}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

      </Grid>
    </div>
  );
};

export default Dashboard;
