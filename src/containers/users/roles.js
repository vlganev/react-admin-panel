import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadAllDetailedRoles, loadAllAccessKeys } from '../../actions/users';
import { Button, Popover, PopoverInteractionKind, Position, Intent, Classes, H5 } from '@blueprintjs/core';
import EditRolePanel from './EditRolePanel';
import { Row, Col } from 'react-simple-flex-grid';
import AddRoleOverlay from './AddRoleOverlay';

class Roles extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isOpen: false,
            userOpened: 0,
        }
    }
    
    componentWillMount() {
        this.props.loadAllDetailedRoles();
        this.props.loadAllAccessKeys();
    }

    render() {
        if (this.props.detailedRoles === undefined) return null;

        return (
            <div>
                <Row>
                    <Col span={4} style={{'paddingTop':'20px'}}>
                        <Button 
                            rightIcon="arrow-right" 
                            intent="success"
                            text="Добави нова роля"
                            style={{marginTop:'20px', marginLeft:'20px', marginBottom:'20px' }}
                            onClick={this.handleOpen}
                        />
                        <table className="bp3-html-table bp3-small bp3-html-table-striped bp3-html-table-bordered bp3-interactive" style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Наименование</th>
                                    <th>Позволения</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {
                                    this.props.detailedRoles.map((el, index) => {
                                        return(
                                            <tr key={el.id}>
                                                <td>{el.id}</td>
                                                <td>{el.title}</td>
                                                <td>
                                                    <ul className="bp3-list bp3-list-unstyled">{el.permissions.map((el2, index) => {
                                                    return (
                                                        <li key={index}>
                                                            {el2.route}
                                                        </li>
                                                    )
                                                })}
                                                    </ul>
                                                </td>
                                                <td>
                                                    <div className="bp3-button-group">
                                                        <Button icon="edit" onClick={() => this.handleEditRole(index)} />
                                                        <Popover
                                                            interactionKind={PopoverInteractionKind.CLICK}
                                                            popoverClassName="bp3-popover-content-sizing"
                                                            position={Position.BOTTOM_RIGHT}
                                                        >
                                                            <Button icon="delete" />
                                                            <div>
                                                                <H5>ПОТВЪРЖДЕНИЕ</H5>
                                                                <p>Моля, потвърди, че желаеш потребителската група да бъде изтрита.</p>
                                                                <p>ВНИМАНИЕ! Потребителите в тази потребителска група ще останат без права за достъп</p>
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
                    </Col>
                    <Col span={8} style={{'paddingTop':'20px'}}>
                        <EditRolePanel 
                            accessKeys={this.props.accessKeys}
                            {...this.props.detailedRoles[this.state.userOpened]} 
                        />
                    </Col>
                </Row>
                <AddRoleOverlay isOpen={this.state.isOpen} handleClose={this.handleClose} />
            </div>
        )
    }

    handleOpen = () => {
        this.setState({ 
            isOpen: true, 
        }); 
    }
    handleClose = () => {
        this.setState({ isOpen: false });
    }

    handleEditRole = (key) => {
        this.setState({ 
            userOpened: key 
        })
    }
}

const mapStateToProps = (state) => {
    return {
        detailedRoles: state.users.detailedRoles,
        accessKeys: state.users.accessKeys,
    };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        loadAllDetailedRoles: () => dispatch(loadAllDetailedRoles()),
        loadAllAccessKeys: () => dispatch(loadAllAccessKeys()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Roles));