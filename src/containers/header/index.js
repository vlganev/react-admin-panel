import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { logout } from '../../actions/login';
import SettingsMenu from './settings-menu';
import ModulesMenu from './modules-menu';
import { Navbar, NavbarGroup, NavbarDivider, Button, NavbarHeading, Alignment } from "@blueprintjs/core";
import AdministrativeMenu from './AdministrativeMenu';

class Header extends React.Component{
  // constructor(props) {
  //   super(props);
  //   this.onLogoutClick = this.onLogoutClick.bind(this);
  // }
  
  // onLogoutClick() {
    // this.props.logout();
    // this.props.history.push('/')
  // }

  render() {
    if (this.props.login.isLoginSuccess === false) {
      return null;
    }
    
    return(
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>AdminPanel</NavbarHeading>
          <NavbarDivider />
          <Link to="/dashboard">
            <Button className="bp3-minimal" icon="home" text="Начало" />
          </Link>
          <ModulesMenu />
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <AdministrativeMenu />
          <NavbarDivider />
          <SettingsMenu />
        </NavbarGroup>
      </Navbar>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    login: state.login
  };
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch,
//     logout: () => dispatch(logout())
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
export default connect(mapStateToProps, null, null, {})(Header)