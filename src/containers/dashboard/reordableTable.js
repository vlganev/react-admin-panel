import * as React from "react";

import { Switch } from "@blueprintjs/core";
import { handleBooleanChange } from "@blueprintjs/docs-theme";
import { Cell, Column, Table, Utils } from "@blueprintjs/table";

// export interface ITableReorderableExampleState {
//     columns?: JSX.Element[];
//     data?: any[];
//     enableColumnInteractionBar?: boolean;
// }

// const REORDERABLE_TABLE_DATA = [
//     ["A", "Apple", "Ape", "Albania", "Anchorage"],
//     ["B", "Banana", "Boa", "Brazil", "Boston"],
//     ["C", "Cranberry", "Cougar", "Croatia", "Chicago"],
//     ["D", "Dragonfruit", "Deer", "Denmark", "Denver"],
//     ["E", "Eggplant", "Elk", "Eritrea", "El Paso"],
// ].map(([no, name, animal, address, city]) => ({ no, name, address, country, city }));

export class ReordableTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            columnWidths: [30, 140, 350, 350, 200],
            columns: [
                // these cellRenderers are only created once and then cloned on updates
                <Column key="1" name="  " cellRenderer={this.getCellRenderer("no")} />,
                <Column key="2" name="Име" cellRenderer={this.getCellRenderer("name")} />,
                <Column key="3" name="Адрес" cellRenderer={this.getCellRenderer("address")} />,
                <Column key="4" name="Описание" cellRenderer={this.getCellRenderer("description")} />,
                <Column key="5" name="Статус" cellRenderer={this.getCellRenderer("status")} />,
            ],
            data: props.data.map(([no, name, address, description, status]) => ({ no, name, address, description, status })),
            enableColumnInteractionBar: false,
        };
      }

    toggleUseInteractionBar = handleBooleanChange(enableColumnInteractionBar =>
        this.setState({ enableColumnInteractionBar }),
    );

    componentWillReceiveProps(props) {
        if (props.data != undefined) {
            this.setState({ data: props.data.map(([no, name, address, description, status]) => ({ no, name, address, description, status }))})
        } else {
            this.setState({ data: [] });
        }
    }

    componentDidUpdate(_nextProps, nextState) {
        const { enableColumnInteractionBar } = this.state;
        if (nextState.enableColumnInteractionBar !== enableColumnInteractionBar) {
            const nextColumns = React.Children.map(this.state.columns, (column) => {
                return React.cloneElement(column, { enableColumnInteractionBar });
            });
            this.setState({ columns: nextColumns });
        }
    }

    render() {
        const { enableColumnInteractionBar } = this.state;
        const options = (
            <Switch
                checked={enableColumnInteractionBar}
                label="Interaction bar"
                onChange={this.toggleUseInteractionBar}
            />
        );
        return (
                <Table
                    enableColumnReordering={true}
                    enableColumnResizing={false}
                    enableRowReordering={true}
                    enableRowResizing={false}
                    numRows={this.state.data.length}
                    onColumnsReordered={this.handleColumnsReordered}
                    onRowsReordered={this.handleRowsReordered}
                    enableColumnInteractionBar={enableColumnInteractionBar}
                    columnWidths={this.state.columnWidths}
                >
                    {this.state.columns}
                </Table>
        );
    }

    getCellRenderer(key) {
        return (row) => <Cell>{this.state.data[row][key]}</Cell>;
    }

    handleColumnsReordered = (oldIndex, newIndex, length) => {
        if (oldIndex === newIndex) {
            return;
        }
        const nextChildren = Utils.reorderArray(this.state.columns, oldIndex, newIndex, length);
        this.setState({ columns: nextChildren });
    };

    handleRowsReordered = (oldIndex, newIndex, length) => {
        if (oldIndex === newIndex) {
            return;
        }
        this.setState({ data: Utils.reorderArray(this.state.data, oldIndex, newIndex, length) });
    };
}