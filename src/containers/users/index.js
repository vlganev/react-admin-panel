import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadAllUsers, loadAllRoles } from '../../actions/users';
import { Button, Popover, PopoverInteractionKind, Position, Intent, Classes, H5 } from '@blueprintjs/core';
import EditUserOverlay from './EditUserOverlay';
import ToastSuccess from '../../components/ToastSuccess';
import ToastDanger from '../../components/ToastDanger';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isOpen: false,
            userOpened: 0,
        }
    }
    
    componentWillMount() {
        this.props.loadAllUsers();
        this.props.loadAllRoles();
    }

//     componentWillReceiveProps(props) {
// console.log('render')
// console.log(this.props.createUserStatus)
//         if (this.props.createUserStatus && this.props.createUserStatus.result === "OK") {
//             this.props.handleClose();
//         }
//     }

    render() {
      return (
            <div>
                <Button 
                    rightIcon="arrow-right" 
                    intent="success"
                    text="Добави нов потребител"
                    style={{marginTop:'20px', marginLeft:'20px', marginBottom:'20px' }}
                    onClick={this.handleOpen}
                />
                <table className="bp3-html-table bp3-small bp3-html-table-striped bp3-html-table-bordered bp3-interactive"  style={{width:'100%'}}>
                    <thead>
                        <tr>
                            <th style={{width:'4%'}}>ID</th>
                            <th style={{width:'26%'}}>Email</th>
                            <th style={{width:'30%'}}>Име</th>
                            <th style={{width:'30%'}}>Роли</th>
                            <th style={{width:'10%'}}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(this.props.users).map((key, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{this.props.users[key].id}</td>
                                        <td>{this.props.users[key].email}</td>
                                        <td>{this.props.users[key].firstName + ' ' + this.props.users[key].middleName + ' ' + this.props.users[key].lastName}</td>
                                        <td>
                                            <ul className="bp3-list bp3-list-unstyled">{this.props.users[key].roles.map((el, index) => {
                                            return (
                                                <li key={index}>
                                                    {el.title}
                                                </li>
                                            )
                                        })}
                                            </ul>
                                        </td>
                                        <td>
                                            <div className="bp3-button-group">
                                                <Button icon="edit" onClick={() => this.handleOpen(key)} />
                                                
                                                <Popover
                                                    interactionKind={PopoverInteractionKind.CLICK}
                                                    popoverClassName="bp3-popover-content-sizing"
                                                    position={Position.BOTTOM_RIGHT}
                                                >
                                                    <Button icon="disable" />
                                                    <div>
                                                        <H5>ПОТВЪРЖДЕНИЕ</H5>
                                                        <p>Моля, потвърди, че желаеш профилът да бъде изтрит.</p>
                                                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 15 }}>
                                                            <Button className={Classes.POPOVER_DISMISS} style={{ marginRight: 10 }}>
                                                                Откажи
                                                            </Button>
                                                            <Button intent={Intent.DANGER} className={Classes.POPOVER_DISMISS}>
                                                            Деактивирай
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Popover>
                                                <Popover
                                                    interactionKind={PopoverInteractionKind.CLICK}
                                                    popoverClassName="bp3-popover-content-sizing"
                                                    position={Position.BOTTOM_RIGHT}
                                                >
                                                    <Button icon="delete" />
                                                    <div>
                                                        <H5>ПОТВЪРЖДЕНИЕ</H5>
                                                        <p>Моля, потвърди, че желаеш профилът да бъде изтрит.</p>
                                                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 15 }}>
                                                            <Button className={Classes.POPOVER_DISMISS} style={{ marginRight: 10 }}>
                                                                Откажи
                                                            </Button>
                                                            <Button intent={Intent.DANGER} className={Classes.POPOVER_DISMISS}>
                                                                Изтрий
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            </div>
                                        </td>
                                    </tr>
                                    )
                                }
                            )
                        } 
                    </tbody>
                </table>
                <EditUserOverlay 
                    isOpen={this.state.isOpen}
                    handleClose={this.handleClose}
                    allRoles={this.props.allRoles}
                    {...this.props.users[this.state.userOpened]} 
                />
            </div>     
        )
    }

    handleOpen = (key) => {
        this.setState({ 
            isOpen: true, 
            userOpened: key 
        }); 
    }

    handleClose = () => {
        this.setState({ isOpen: false });
    }

    showToast = (message,  type) => {
        if (type === 'danger') {
            ToastDanger.show({ message });
        } else if (type === 'success') {
            ToastSuccess.show({ message });
        }
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
        loadAllUsers: () => dispatch(loadAllUsers()),
        loadAllRoles: () => dispatch(loadAllRoles()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Users));