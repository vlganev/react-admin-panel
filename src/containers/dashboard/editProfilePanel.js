import * as React from "react";
import { InputGroup, Label, Radio, RadioGroup, Checkbox, Button, Toast, Toaster, Position, Intent } from "@blueprintjs/core";

export default class EditProfilePanel extends React.PureComponent {
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
                <RadioGroup
                    onChange={this.handleTypeChange}
                    selectedValue={this.state.type}
                >
                    <Radio className="bp3-large" label="Юридическо лице" value="one" />
                    <Radio className="bp3-large" label="Физическо лице" value="two" />
                </RadioGroup>
                <Checkbox checked={this.state.isCompanyCredit} className="bp3-large" label="Свързан с фирмен кредит" onChange={this.handleCompanyCreditChange} />

                <Label
                    className="bp3-ui-text-large"
                    text="Име"
                >
                    <InputGroup 
                    className="bp3-large" 
                    type="text" 
                    name="name" 
                    id="name" 
                    ref="name"
                    placeholder="Име" 
                    dir="auto"
                    onChange={event => this.setState({ name: event.target.value })}
                    value={this.state.name}
                    />
                </Label>
                <Label
                    className="bp3-ui-text-large"
                    text="ЕГН"
                >
                    <InputGroup 
                    className="bp3-large" 
                    type="text" 
                    name="socialId" 
                    id="socialId" 
                    ref="socialId"
                    placeholder="ЕГН" 
                    dir="auto"
                    onChange={event => this.setState({ socialId: event.target.value })}
                    value={this.state.socialId}
                    />
                </Label>
                <label className="bp3-label">
                    Label A
                    <div className="bp3-select bp3-large">
                    <select>
                        <option selected>Качество</option>
                        <option value="1">Длъжник</option>
                        <option value="2">Поръчител</option>
                        <option value="3">Солидарен длъжник</option>
                        <option value="4">Наследник</option>
                    </select>
                    </div>
                </label>
                <Label
                    className="bp3-ui-text-large"
                    text="Телефон"
                >
                    <InputGroup 
                    className="bp3-large" 
                    type="text" 
                    name="phone" 
                    id="phone" 
                    ref="phone"
                    placeholder="Име" 
                    dir="auto"
                    onChange={event => this.setState({ phone: event.target.value })}
                    value={this.state.phone}
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

    handleTypeChange = () => {

    }

    handleCompanyCreditChange = () => {

    }

    addToast(toast) {
        toast.timeout = 5000;
        this.toaster.show(toast);
    }
}

