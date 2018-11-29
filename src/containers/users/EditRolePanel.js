import React from 'react';
import classNames from "classnames";
import { H3, H4, Classes, Checkbox } from '@blueprintjs/core';
import { Row, Col } from 'react-simple-flex-grid';
import { setServiceStatus, TOAST_SUCCESS_MESSAGE } from '../../actions/service';
import { connect } from 'react-redux';
import { modifyAccessCheckbox, loadAllDetailedRoles } from '../../actions/users';

const classes = classNames(Classes.CARD, Classes.ELEVATION_4);

class EditRolePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            enabledElements: {},
        }
        console.log(this.props)
    }

    componentWillReceiveProps() {
        this.setState({
            enabledElements: {},
        })
    }

    render() {
        return (
                <div className={classes} style={{marginRight: '20px', marginLeft:'20px'}}>
                    <H3>{this.props.title}</H3>
                    {
                        this.props.accessKeys && this.props.accessKeys.map((el, index) => {
                            return (
                                <div key={index} >
                                <H4>Модул {el.name}</H4>
                                    <Row>
                                        {
                                            el.endpoints.map((endpoint, endpointIndex) => {
                                                this.props.permissions.map((el2) => {
                                                    if (endpoint.route == el2.route) this.state.enabledElements[el2.route]  = true;
                                                })
                                                // let permission = endpoint.path  + ' ' + endpoint.httpMethod;

                                                return (
                                                    <Col span={4} key={endpointIndex}>
                                                        <Checkbox 
                                                            key={endpointIndex} 
                                                            checked={this.state.enabledElements[endpoint.route] || false} 
                                                            label={endpoint.description + ' [ ' + endpoint.path  + ' ' + endpoint.httpMethod + ' ] ' } 
                                                            onChange={this.handleEnabledChange.bind(this, endpoint.route)} 
                                                        />
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </div>
                            )
                        })
                    }
                </div>
        )
    }

    handleEnabledChange = (index) => {
        let enabledElements = this.state.enabledElements;
        enabledElements[index] = !enabledElements[index];

        let obj = {
            roleId: this.props.id,
            route: index,
            modify: 'new'
        }

        if (!enabledElements[index]) {
            obj.modify = 'delete';

            // ne me kefi
            obj.id = this.props.permissions.filter(el => el.route == index )[0].id;
        }

        this.props.modifyAccessCheckbox(obj, () => this.modifiedCheckbox(enabledElements))
    }

    modifiedCheckbox = (enabledElements) => {
        this.setState({ enabledElements });
        this.props.loadAllDetailedRoles();
    }
}

const mapStateToProps = (state) => {
    return {

    };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        modifyAccessCheckbox: (obj, callback) => dispatch(modifyAccessCheckbox(obj, callback)),
        setServiceStatus: (val, type) => dispatch(setServiceStatus(val, type)),
        loadAllDetailedRoles: () => dispatch(loadAllDetailedRoles()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRolePanel);