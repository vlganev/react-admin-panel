import React from 'react';
import { connect } from 'react-redux';
// import Orders from './orders';
// import Departments from './departments';
import { Popover, Menu, MenuItem, Button, Position, Switch, MenuDivider } from "@blueprintjs/core";
import { setSettingValue, DARK_SKIN } from '../../actions/settings';
import { logout } from '../../actions/login';

class SettingsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    render() {
        return (
            <Popover content={
                <Menu className="bp3-large">
                    <MenuDivider title="Лични настройки" />
                    <MenuDivider />
                    <Switch checked={this.props.isDarkSkin} label="Смени фона на тъмен" onChange={this.setDarkSkin} className="bp3-large" />
                    <MenuItem icon="log-out" text="Изход" onClick={this.onLogoutClick} />
                </Menu>
            } 
                position={Position.BOTTOM}
            >
                <Button className="bp3-minimal" icon="cog" />
            </Popover>
        )
    }
    
    setDarkSkin = () => {
        this.props.setSettingValue(!this.props.isDarkSkin, DARK_SKIN)
    }

    onLogoutClick() {
        this.props.logout();
        this.props.history.push('/')
    }
}

const mapStateToProps = (state) => {
    return {
        isDarkSkin: state.settings.isDarkSkin,
        login: state.login,
        history: state.history
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        setSettingValue: (val, type) => dispatch(setSettingValue(val, type)),
        logout: () => dispatch(logout())
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SettingsMenu);