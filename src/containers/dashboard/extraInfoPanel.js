import * as React from "react";
import { InputGroup, Label, Button, Toaster, Toast, Position, Intent } from "@blueprintjs/core";

export default class ExtraInfoPanel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            type: '',
            isCompanyCredit: true,
            toasts: [],
        };
    }

    render() {
        return(
            <form>
                <Label
                    className="bp3-ui-text-large"
                    text="ПДИ"
                >
                    <InputGroup 
                    className="bp3-large" 
                    type="text" 
                    name="PDI" 
                    id="PDI" 
                    ref="PDI"
                    placeholder="ПДИ" 
                    dir="auto"
                    onChange={event => this.setState({ PDI: event.target.value })}
                    value={this.state.PDI}
                    />
                </Label>
                <Label
                    className="bp3-ui-text-large"
                    text="Имущество"
                >
                    <InputGroup 
                    className="bp3-large" 
                    type="text" 
                    name="property" 
                    id="property" 
                    ref="property"
                    placeholder="Имущество" 
                    dir="auto"
                    onChange={event => this.setState({ property: event.target.value })}
                    value={this.state.property}
                    />
                </Label>
                <Label
                    className="bp3-ui-text-large"
                    text="Работодател"
                >
                    <InputGroup 
                    className="bp3-large" 
                    type="text" 
                    name="employer" 
                    id="employer" 
                    ref="employer"
                    placeholder="Работодател" 
                    dir="auto"
                    onChange={event => this.setState({ employer: event.target.value })}
                    value={this.state.employer}
                    />
                </Label>
                <Button 
                    className="bp3-button bp3-large"
                    icon="tick" 
                    type="submit"
                    text="Потвърди"
                    onClick={this.saveState}
                />
                <Toaster position={Position.BOTTOM_CENTER} ref={this.refHandlers.toaster}>
                    {this.state.toasts.map(toast => <Toast {...toast} />)}
                </Toaster>
            </form>
        );
    }

    handleTypeChange = () => {

    }

    handleCompanyCreditChange = () => {
        
    }

    refHandlers = {
        toaster: (ref) => this.toaster = ref,
    };
    
    saveState = (e) => {
        e.preventDefault();
        this.toaster.show({
            action: {
                onClick: () =>
                    this.addToast({
                        icon: "ban-circle",
                        intent: Intent.DANGER,
                        message: "Не можеш да върнеш миналото.",
                    }),
                text: "Спри промените",
            },
            button: "Move files",
            icon: "tick",
            intent: Intent.SUCCESS,
            message: "Промяната е запазена!" 
        });
    }

    addToast(toast) {
        toast.timeout = 5000;
        this.toaster.show(toast);
    }
}

