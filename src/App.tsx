import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginScreen from './containers/LoginScreen/LoginScreen';
import ActionScreen from './containers/ActionsScreen/ActionsScreen';
import ConsultReportsScreen from './containers/ConsultReportsScreen/ConsultReportsScreen';
import RegisterReportScreen from './containers/RegisterReportScreen/RegisterReportScreen';
import ADReportsScreen from './containers/ADReportsScreen/ADReportsScreen';

const App: React.FC = () => {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={LoginScreen} />
            <Route path="/actions" exact={true} component={ActionScreen} />
            <Route path="/consult-reports" exact={true} component={ConsultReportsScreen} />
            <Route path="/register-report" exact={true} component={RegisterReportScreen} />
            <Route path="/ad-reports" exact={true} component={ADReportsScreen} />
        </Switch>
    </ BrowserRouter>
  );
}

export default App;
