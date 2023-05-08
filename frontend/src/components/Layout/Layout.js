import React, { useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import classnames from 'classnames'

import SettingsIcon from '@mui/icons-material/Settings';
import GithubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import {
    Fab,
    IconButton
} from '@mui/material'
import { connect } from 'react-redux';
// styles
import useStyles from './styles'

// components
import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { Link } from '../Wrappers'
import ColorChangeThemePopper from './components/ColorChangeThemePopper'

import EditUser from '../../pages/user/EditUser';

// pages
import Dashboard from '../../pages/dashboard'
import BreadCrumbs from '../../components/BreadCrumbs'

// context
import { useLayoutState } from '../../context/LayoutContext'

import UsersFormPage from 'pages/CRUD/Users/form/UsersFormPage';
import UsersTablePage from 'pages/CRUD/Users/table/UsersTablePage';

import AlgorithmsFormPage from 'pages/CRUD/Algorithms/form/AlgorithmsFormPage';
import AlgorithmsTablePage from 'pages/CRUD/Algorithms/table/AlgorithmsTablePage';

import TeamsFormPage from 'pages/CRUD/Teams/form/TeamsFormPage';
import TeamsTablePage from 'pages/CRUD/Teams/table/TeamsTablePage';

import FederationFormPage from 'pages/CRUD/Federation/form/FederationFormPage';
import FederationTablePage from 'pages/CRUD/Federation/table/FederationTablePage';

import ProjectsFormPage from 'pages/CRUD/Projects/form/ProjectsFormPage';
import ProjectsTablePage from 'pages/CRUD/Projects/table/ProjectsTablePage';

import PaymentsFormPage from 'pages/CRUD/Payments/form/PaymentsFormPage';
import PaymentsTablePage from 'pages/CRUD/Payments/table/PaymentsTablePage';

import TrainingFormPage from 'pages/CRUD/Training/form/TrainingFormPage';
import TrainingTablePage from 'pages/CRUD/Training/table/TrainingTablePage';

import DeploymentFormPage from 'pages/CRUD/Deployment/form/DeploymentFormPage';
import DeploymentTablePage from 'pages/CRUD/Deployment/table/DeploymentTablePage';

import MonitoringFormPage from 'pages/CRUD/Monitoring/form/MonitoringFormPage';
import MonitoringTablePage from 'pages/CRUD/Monitoring/table/MonitoringTablePage';

import Model_exchangeFormPage from 'pages/CRUD/Model_exchange/form/Model_exchangeFormPage';
import Model_exchangeTablePage from 'pages/CRUD/Model_exchange/table/Model_exchangeTablePage';

const Redirect = (props) => {
  useEffect(() => window.location.replace(props.url))
  return <span>Redirecting...</span>;
}

function Layout(props) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)

    const open = Boolean(anchorEl)
    const id = open ? 'add-section-popover' : undefined
    const handleClick = event => {
        setAnchorEl(open ? null : event.currentTarget)
    }

    // global
    let layoutState = useLayoutState()

    return (
        <div className={classes.root}>
            <Header history={props.history} />
            <Sidebar />
            <div
                className={classnames(classes.content, {
                    [classes.contentShift]: layoutState.isSidebarOpened,
                })}
            >
                <div className={classes.fakeToolbar} />
                <BreadCrumbs />
                <Switch>

                    <Route path="/admin/dashboard" component={Dashboard} />
                    <Route path="/admin/user/edit" component={EditUser} />
                    <Route
                      path={'/admin/api-docs'}
                      exact
                      component={(props) => <Redirect url={process.env.NODE_ENV === 'production'
                        ? window.location.origin + '/api-docs'
                        : 'http://localhost:8080/api-docs'} {...props}/>}
                    />

                    <Route path={"/admin/users"} exact component={UsersTablePage} />
                    <Route path={"/admin/users/new"} exact component={UsersFormPage} />
                    <Route path={"/admin/users/:id/edit"} exact component={UsersFormPage} />

                    <Route path={"/admin/algorithms"} exact component={AlgorithmsTablePage} />
                    <Route path={"/admin/algorithms/new"} exact component={AlgorithmsFormPage} />
                    <Route path={"/admin/algorithms/:id/edit"} exact component={AlgorithmsFormPage} />

                    <Route path={"/admin/teams"} exact component={TeamsTablePage} />
                    <Route path={"/admin/teams/new"} exact component={TeamsFormPage} />
                    <Route path={"/admin/teams/:id/edit"} exact component={TeamsFormPage} />

                    <Route path={"/admin/federation"} exact component={FederationTablePage} />
                    <Route path={"/admin/federation/new"} exact component={FederationFormPage} />
                    <Route path={"/admin/federation/:id/edit"} exact component={FederationFormPage} />

                    <Route path={"/admin/projects"} exact component={ProjectsTablePage} />
                    <Route path={"/admin/projects/new"} exact component={ProjectsFormPage} />
                    <Route path={"/admin/projects/:id/edit"} exact component={ProjectsFormPage} />

                    <Route path={"/admin/payments"} exact component={PaymentsTablePage} />
                    <Route path={"/admin/payments/new"} exact component={PaymentsFormPage} />
                    <Route path={"/admin/payments/:id/edit"} exact component={PaymentsFormPage} />

                    <Route path={"/admin/training"} exact component={TrainingTablePage} />
                    <Route path={"/admin/training/new"} exact component={TrainingFormPage} />
                    <Route path={"/admin/training/:id/edit"} exact component={TrainingFormPage} />

                    <Route path={"/admin/deployment"} exact component={DeploymentTablePage} />
                    <Route path={"/admin/deployment/new"} exact component={DeploymentFormPage} />
                    <Route path={"/admin/deployment/:id/edit"} exact component={DeploymentFormPage} />

                    <Route path={"/admin/monitoring"} exact component={MonitoringTablePage} />
                    <Route path={"/admin/monitoring/new"} exact component={MonitoringFormPage} />
                    <Route path={"/admin/monitoring/:id/edit"} exact component={MonitoringFormPage} />

                    <Route path={"/admin/model_exchange"} exact component={Model_exchangeTablePage} />
                    <Route path={"/admin/model_exchange/new"} exact component={Model_exchangeFormPage} />
                    <Route path={"/admin/model_exchange/:id/edit"} exact component={Model_exchangeFormPage} />

                </Switch>
                <Fab
                    color="primary"
                    aria-label="settings"
                    onClick={e => handleClick(e)}
                    className={classes.changeThemeFab}
                    style={{ zIndex: 100 }}
                >
                    <SettingsIcon style={{ color: '#fff' }} />
                </Fab>
                <ColorChangeThemePopper
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                />
                <Footer>
                    <div>
                        <Link
                            color={'primary'}
                            href={'https://flatlogic.com/'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            Flatlogic
                        </Link>
                        <Link
                            color={'primary'}
                            href={'https://flatlogic.com/about'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            About Us
                        </Link>
                        <Link
                            color={'primary'}
                            href={'https://flatlogic.com/blog'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            Blog
                        </Link>
                    </div>
                    <div>
                        <Link
                            href={'https://www.facebook.com/flatlogic'}
                            target={'_blank'}
                        >
                            <IconButton aria-label="facebook">
                              <FacebookIcon style={{ color: '#6E6E6E99' }} />
                            </IconButton>
                        </Link>
                        <Link
                            href={'https://twitter.com/flatlogic'}
                            target={'_blank'}
                        >
                            <IconButton aria-label="twitter">
                              <TwitterIcon style={{ color: '#6E6E6E99' }} />
                            </IconButton>
                        </Link>
                        <Link
                            href={'https://github.com/flatlogic'}
                            target={'_blank'}
                        >
                            <IconButton
                                aria-label="github"
                                style={{ padding: '12px 0 12px 12px' }}
                            >
                              <GithubIcon style={{ color: '#6E6E6E99' }} />
                            </IconButton>
                        </Link>
                    </div>
                </Footer>
            </div>
        </div>
    )
}

export default withRouter(connect()(Layout))
