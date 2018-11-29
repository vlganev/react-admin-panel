import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../../actions/login';
import Login from '../login';
import Header from '../header';
import Dashboard from '../dashboard';
import FSO from '../FSO';
import LawModule from '../lawModule';
import Users from '../users';
import Roles from '../users/roles';
import ToastSuccess from '../../components/ToastSuccess';
import ToastDanger from '../../components/ToastDanger';

const isAuthenticated = () => !!localStorage.getItem('panelToken')

const PrivateRoute = ({
    component: Component,
    ...rest
}) => (
    <Route {...rest} render={props => (isAuthenticated()
	    ? (<Component {...props} />)
        : (<Redirect to={{
    	    pathname: '/',
        	state: {
            from: props.location
          }
        }} />))} />
    )
  
class App extends React.Component {
  componentDidMount() {
    this.props.isLoggedIn();
  }

  componentWillReceiveProps(props) {
    document.getElementsByTagName('BODY')[0].style.backgroundColor = props.isDarkSkin ? '#30404d' : '#fff';
  }

  render() {
    return (
      <div className={
        this.props.isDarkSkin ? 'bp3-dark' : ''
      }>
          <Header />
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/fso" component={FSO} />
          <PrivateRoute exact path="/law" component={LawModule} />
          <PrivateRoute exact path="/users" component={Users} />
          <PrivateRoute exact path="/roles" component={Roles} />
          <ToastSuccess />
          <ToastDanger />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isDarkSkin: state.settings.isDarkSkin,
    route: state.routing,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    isLoggedIn: () => dispatch(isLoggedIn())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);