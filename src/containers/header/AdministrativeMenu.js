import React from 'react';
import { connect } from 'react-redux';
// import Orders from './orders';
// import Departments from './departments';
import { Popover, Menu, Button, Position, MenuItem, MenuDivider } from "@blueprintjs/core";

class AdministrativeMenu extends React.Component {
    render() {
        return (
            <Popover content={
                <Menu className="bp3-large">
                    <MenuDivider title="Потребители" />
                    <MenuDivider />
                    <MenuItem text="Потребители" icon="person" href="/users" />
                    <MenuItem text="Потребителски групи" icon="people" href="/roles" />
                </Menu>
            } 
                position={Position.BOTTOM}
            >
                <Button className="bp3-minimal" icon="helper-management" />
            </Popover>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AdministrativeMenu);