// Components
import React from 'react'
import { Route } from 'react-router-dom'

// Pages
import NotFoundPage from '../components/shared/NotFoundPage'
import LoginPage from '../components/LoginPage'
import DashboardPage from '../components/DashboardPage'
import ApplicationsPage from '../components/ApplicationsPage'
import TeamPage from '../components/TeamPage'
import EventsPage from '../components/EventsPage'
import SubscribersPage from '../components/SubscribersPage'
import CompanyPage from '../components/CompanyPage'
import StatusPage from '../components/StatusPage'
import MemberProfilePage from '../components/shared/MemberProfilePage'
import CreateCompanyPage from '../components/company/CreateCompanyPage'
import ApplicationDetailsPage from '../components/application/ApplicationDetailsPage'

// Custom routes
import RedirectAuthed from './RedirectAuthed'
import AuthRoute from './AuthRoute'
import CreateCompanyRoute from './CreateCompanyRoute'

import { Switch } from 'react-router-dom'

const Routes = () => (
  <Switch>
    <RedirectAuthed path="/" exact={true} component={LoginPage} />
    <AuthRoute path="/dashboard" exact={true} component={DashboardPage} />
    <AuthRoute boxed path="/applications" exact={true} component={ApplicationsPage} />
    <AuthRoute boxed path="/applications/:applicationId" exact={true} component={ApplicationDetailsPage} />
    <AuthRoute boxed path="/events" exact={true} component={EventsPage} />
    <AuthRoute boxed path="/subscribers" exact={true} component={SubscribersPage} />
    <AuthRoute boxed path="/team" exact={true} component={TeamPage} />
    <AuthRoute path="/team/profile" exact={true} component={MemberProfilePage} />
    <AuthRoute boxed path="/company" exact={true} component={CompanyPage} />
    <AuthRoute boxed path="/statuspage" exact={true} component={StatusPage} />
    <CreateCompanyRoute path="/create-company" exact={true} component={CreateCompanyPage} />
    <Route path="*" exact={true} component={NotFoundPage} />
  </Switch>
)

export default Routes
