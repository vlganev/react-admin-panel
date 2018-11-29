import React from 'react';
import { Position, Toast, Toaster, Intent } from "@blueprintjs/core";
import { connect } from 'react-redux';
 
const toast = {
    icon: "tick",
    intent: Intent.SUCCESS,
};

class ToastSuccess extends React.Component {
    state = { toasts: [] }

    componentWillReceiveProps(props) {
        if (props.toastSuccessMessage) {
            toast.message = props.toastSuccessMessage
            this.addToast(toast); 
        }
    }

    render() {
        return (
            <Toaster 
                position={Position.TOP} 
                ref={this.refHandlers.toaster}
            />
        )
    }
 
    refHandlers = {
        toaster: (ref) => this.toaster = ref,
    };

    addToast = (toast) => {
        this.toaster.show(toast)
    }
}

const mapStateToProps = (state) => {
    return {
        toastSuccessMessage: state.service.toastSuccessMessage,
    };
} 
  
const mapDispatchToProps = (dispatch) => {
    return {

    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ToastSuccess);