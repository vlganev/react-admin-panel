import React from 'react';
import { Position, Toaster, Toast, Intent } from "@blueprintjs/core";
import { connect } from 'react-redux';

const toast = {
    icon: "error",
    intent: Intent.DANGER,
};

class ToastDanger extends React.Component {
    state = { toasts: [] }

    componentWillReceiveProps(props) {
        if (props.toastDangerMessage) {
            toast.message = props.toastDangerMessage
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
        toastDangerMessage: state.service.toastDangerMessage,
    };
} 
  
const mapDispatchToProps = (dispatch) => {
    return {
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ToastDanger);