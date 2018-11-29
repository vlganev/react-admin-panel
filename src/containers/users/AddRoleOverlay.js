import React from 'react';
import classNames from "classnames";
import { H3, Classes, Intent, Button, Label, InputGroup, Overlay } from '@blueprintjs/core';
import { setServiceStatus, TOAST_SUCCESS_MESSAGE } from '../../actions/service';
import { connect } from 'react-redux';
import { modifyRole, loadAllRoles } from '../../actions/users';

const classes = classNames(Classes.CARD, Classes.ELEVATION_4, 'overlay');

class AddRoleOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            enabledElements: {},
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            email: props.email || '',
        })

        if (props.toastSuccessMessage) {
            this.props.handleClose(); 
            this.props.loadAllRoles();   
        }
    }

    render() {
        return (
            <Overlay onClose={this.props.handleClose} className={Classes.OVERLAY_SCROLL_CONTAINER} isOpen={this.props.isOpen}>
                <div className={classes} style={{marginRight: '20px'}}>
                    <H3>Добавяне на роля</H3>
                    <Label
                        className="bp3-ui-text-large"
                        text="Наименование"
                    >
                        <InputGroup 
                        className="bp3-large" 
                        type="text" 
                        name="title" 
                        id="title" 
                        placeholder="Наименование" 
                        dir="auto"
                        onChange={event => this.setState({ title: event.target.value })}
                        value={this.state.title}
                        />
                    </Label>
                    <Button intent={Intent.DANGER} onClick={this.props.handleClose}>
                        Close
                    </Button>
                    <Button intent={Intent.SUCCESS} onClick={this.addNewRole} style={{ float: "right" }}>
                        Потвърди
                    </Button>
                </div>
            </Overlay>
        )
    }

    addNewRole = (e) => {
        e.preventDefault();
        let obj = {title: this.state.title}
        this.props.modifyRole(obj, this.setSuccessToast)
    }

    setSuccessToast = (message) => {
        this.props.setServiceStatus(message, TOAST_SUCCESS_MESSAGE)
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.users.data,
        allRoles: state.users.roles
    };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        modifyRole: (obj, callback) => dispatch(modifyRole(obj, callback)),
        loadAllRoles: () => dispatch(loadAllRoles()),
        setServiceStatus: (val, type) => dispatch(setServiceStatus(val, type)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRoleOverlay);