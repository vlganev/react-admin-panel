import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
// import Orders from './orders';
// import Departments from './departments';
import { Popover, Menu, Button, Position, MenuDivider } from "@blueprintjs/core";

class ModulesMenu extends React.Component {

    render() {
        return (
            <Popover content={
                <Menu className="bp3-large">
                    <MenuDivider />
                    <Link to="/law" className="bp3-menu-item bp3-popover-dismiss">
                        Модул Юридическа дирекция
                    </Link>
                    <Link to="/fso" className="bp3-menu-item bp3-popover-dismiss">
                        Модул ФСО
                    </Link>
                </Menu>
            } 
                position={Position.BOTTOM}
            >
                <Button className="bp3-minimal" icon="applications" text="Модули" />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModulesMenu));