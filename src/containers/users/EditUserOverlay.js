import React from 'react';
import { connect } from 'react-redux';
import { sendUserProfile, loadAllUsers } from '../../actions/users';
import classNames from "classnames";
import { Overlay, H3, Classes, Intent, Button, Label, InputGroup, Checkbox } from '@blueprintjs/core';
import { setServiceStatus, TOAST_SUCCESS_MESSAGE } from '../../actions/service';

const classes = classNames(Classes.CARD, Classes.ELEVATION_4, 'overlay');

class EditUserOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: this.props.email,
            password: this.props.password,
            firstName: this.props.firstName,
            middleName: this.props.middleName,
            lastName: this.props.lastName,
            enabledElements: {},
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            email: props.email || '',
            password: props.password || '',
            firstName: props.firstName || '',
            middleName: props.middleName || '',
            lastName: props.lastName || '',
            enabledElements: {},
        })

        if (props.allRoles && props.roles) {
            let data = {};
            props.allRoles.map((el1, index) => {
                props.roles.map((el2, index2) => {
                    if (el1.id == el2.id) data[el1.id] = true;
                })
            })
            this.setState({ enabledElements: data })
        }
        
        if (props.toastSuccessMessage) {
            this.props.handleClose(); 
            this.props.loadAllUsers();   
        }
    }

    render() {
        return (
            <Overlay onClose={this.props.handleClose} className={Classes.OVERLAY_SCROLL_CONTAINER} isOpen={this.props.isOpen}>
                <div className={classes}>
                    <H3>{(this.props.roles) ? 'Редактиране на потребител' : 'Добавяне на профил'}</H3>
                    <Label
                        className="bp3-ui-text-large"
                        text="Email"
                    >
                        <InputGroup 
                        className="bp3-large" 
                        type="text" 
                        name="email" 
                        id="email" 
                        placeholder="Email" 
                        dir="auto"
                        onChange={event => this.setState({ email: event.target.value })}
                        value={this.state.email}
                        />
                    </Label>
                    <Label
                        className="bp3-ui-text-large"
                        text="Парола"
                    >
                        <InputGroup 
                        className="bp3-large" 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Парола" 
                        dir="auto"
                        onChange={event => this.setState({ password: event.target.value })}
                        value={this.state.password}
                        />
                    </Label>
                    <Label
                        className="bp3-ui-text-large"
                        text="Име"
                    >
                        <InputGroup 
                        className="bp3-large" 
                        type="text" 
                        name="firstName" 
                        id="firstName" 
                        placeholder="Име" 
                        dir="auto"
                        onChange={event => this.setState({ firstName: event.target.value })}
                        value={this.state.firstName}
                        />
                    </Label>
                    <Label
                        className="bp3-ui-text-large"
                        text="Презиме"
                    >
                        <InputGroup 
                        className="bp3-large" 
                        type="text" 
                        name="middleName" 
                        id="middleName" 
                        placeholder="Презиме" 
                        dir="auto"
                        onChange={event => this.setState({ middleName: event.target.value })}
                        value={this.state.middleName}
                        />
                    </Label>
                    <Label
                        className="bp3-ui-text-large"
                        text="Фамилия"
                    >
                        <InputGroup 
                        className="bp3-large" 
                        type="text" 
                        name="lastName" 
                        id="lastName" 
                        placeholder="Фамилия" 
                        dir="auto"
                        onChange={event => this.setState({ lastName: event.target.value })}
                        value={this.state.lastName}
                        />
                    </Label>
                    <p>
                        Роли:
                    </p>
                    {
                        Object.keys(this.props.allRoles).map((index) => {
                            // let index = this.props.allRoles[index].id
                            return (
                                <Checkbox 
                                    key={this.props.allRoles[index].id} 
                                    checked={this.state.enabledElements[this.props.allRoles[index].id] || false} 
                                    label={this.props.allRoles[index].title} 
                                    onChange={() => this.handleEnabledChange(this.props.allRoles[index].id)} 
                                />
                            )
                        })
                    }
                    <br />
                    <Button intent={Intent.DANGER} onClick={this.props.handleClose}>
                        Close
                    </Button>
                    <Button intent={Intent.SUCCESS} onClick={this.handleUserChange} style={{ float: "right" }}>
                        Потвърди
                    </Button>
                </div>
            </Overlay>
        )
    }

    handleEnabledChange = (index) => {
        let enabledElements = this.state.enabledElements;
        enabledElements[index] = !enabledElements[index]
        this.setState({ enabledElements: enabledElements })
    }

    handleUserChange = (e) => {
        e.preventDefault();
        let {email, password, firstName, middleName, lastName, enabledElements } = this.state;
        let rolesData = Object.keys(enabledElements).filter(key => enabledElements[key] == true);
        let obj = {
            email, 
            password, 
            firstName, 
            middleName, 
            lastName, 
            rolesData
        }

        // check if it's new user or edit
        let edit;
        if (this.props.roles) {
            obj.id = this.props.id;
            edit = 'edit'
        } else {
            edit = 'new'
        }
        this.props.sendUserProfile(obj, edit, this.setSuccessToast);
    }

    setSuccessToast = (message) => {
        this.props.setServiceStatus(message, TOAST_SUCCESS_MESSAGE)
    }
}

const mapStateToProps = (state) => {
    return {
        toastSuccessMessage: state.service.toastSuccessMessage,
    };
} 
  
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        sendUserProfile: (obj, edit, callback) => dispatch(sendUserProfile(obj, edit, callback)),
        setServiceStatus: (val, type) => dispatch(setServiceStatus(val, type)),
        loadAllUsers: () => dispatch(loadAllUsers()),
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(EditUserOverlay);