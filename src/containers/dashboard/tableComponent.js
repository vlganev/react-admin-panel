import * as React from "react";

import { Intent, Menu, MenuItem, Overlay, Button, Classes } from "@blueprintjs/core";
// import { Example } from "@blueprintjs/docs-theme";
import { Column, ColumnHeaderCell, EditableCell, EditableName, Table, CopyCellsMenuItem } from "@blueprintjs/table";
import classNames from "classnames";

// export interface ITableEditableExampleState {
//     columnNames?: string[];
//     sparseCellData?: { [key: string]: string };
//     sparseCellIntent?: { [key: string]: Intent };
//     sparseColumnIntents?: Intent[];
// }


export class TableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnWidths: [30, 140, 250, 100, 200, 600],
            columnNames: ["i", "Дело No", "Тип", "Дата", "Добавено от", "Коментар"],
            sparseCellData: props.data,
            sparseCellIntent: {
            //     "1-4": Intent.DANGER,
            },
            sparseColumnIntents: [],
            isInfoOpen: false,
            openedOverlayRow: 0,
        };
        this.onColumnWidthChanged = this.onColumnWidthChanged.bind(this);
        this.openOverlay = this.openOverlay.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
    }
    static dataKey = (rowIndex, columnIndex) => {
        return `${rowIndex}-${columnIndex}`;
    };

    componentWillReceiveProps(props) {
        if (props.data !== undefined) {
            this.setState({ sparseCellData: props.data })
        } else {
            this.setState({ sparseCellData: {} });
        }
    }

    render() {
        const classes = classNames(Classes.CARD, Classes.ELEVATION_4, 'overlay');
        const columns = this.state.columnNames.map((_, index) => {
            return (
                <Column key={index} cellRenderer={this.renderCell} columnHeaderCellRenderer={this.renderColumnHeader} />
            );
        });

        return (
            <div>
                <Overlay isOpen={this.state.isInfoOpen} onClose={this.closeOverlay}>
                    <div className={classes}>
                        <h3>Детайли за дело <strong>{this.getCellData(this.state.openedOverlayRow, 1) }</strong>!</h3>
                        <p>
                            На дата <strong>{this.getCellData(this.state.openedOverlayRow, 3) }</strong> лицето <strong>{this.getCellData(this.state.openedOverlayRow, 4) }</strong> направи сериозна промяна. Ето и коментар:
                        </p>
                        <p>
                            Статус: <strong>{this.getCellData(this.state.openedOverlayRow, 2) }</strong>
                        </p>
                        <p>
                            <strong>{this.getCellData(this.state.openedOverlayRow, 5) }</strong>
                        </p>
                        <br />
                        <Button intent={Intent.DANGER} onClick={this.closeOverlay}>
                            Затвори
                        </Button>
                        <Button style={{ float: "right" }}>
                            Редактирай
                        </Button>
                    </div>
                </Overlay>
                <Table 
                    numRows={7}
                    columnWidths={this.state.columnWidths}
                    onColumnWidthChanged={this.onColumnWidthChanged}
                    bodyContextMenuRenderer={this.renderBodyContextMenu}
                >
                    {columns}
                </Table>
            </div>
        );
    }

    renderBodyContextMenu = (context) => {
        return (
            <Menu>
                <CopyCellsMenuItem context={context} getCellData={this.getCellData} text="Копирай" />
                <MenuItem 
                    text="Повече информация" 
                    onClick={() => this.openOverlay(context)}
                />
            </Menu>
        );
    };

    openOverlay = (context) => {
        // let cellData = this.getCellData(context['regions'][0]['rows'][0], context['regions'][0]['cols'][1]);
        this.setState({ 
            isInfoOpen: true,
            openedOverlayRow: context['regions'][0]['rows'][0],
        });
    }

    closeOverlay = () => {
        this.setState({ isInfoOpen: false });
    }
    
    getCellData = (rowIndex, columnIndex) => {
        const dataKey = TableComponent.dataKey(rowIndex, columnIndex);
        return this.state.sparseCellData[dataKey];
    };

    renderCell = (rowIndex, columnIndex) => {
        const dataKey = TableComponent.dataKey(rowIndex, columnIndex);
        const value = this.state.sparseCellData[dataKey];
        return (
            <EditableCell
                value={value == null ? "" : value}
                intent={this.state.sparseCellIntent[dataKey]}
                onCancel={this.cellValidator(rowIndex, columnIndex)}
                onChange={this.cellValidator(rowIndex, columnIndex)}
                onConfirm={this.cellSetter(rowIndex, columnIndex)}
            />
        );
    };

    renderColumnHeader = (columnIndex) => {
        const nameRenderer = (name) => {
            return (
                <EditableName
                    name={name}
                    intent={this.state.sparseColumnIntents[columnIndex]}
                    onChange={this.nameValidator(columnIndex)}
                    onCancel={this.nameValidator(columnIndex)}
                    onConfirm={this.nameSetter(columnIndex)}
                />
            );
        };
        return <ColumnHeaderCell name={this.state.columnNames[columnIndex]} nameRenderer={nameRenderer} />;
    };

    isValidValue(value) {
        return /^[a-zA-Z]*$/.test(value);
    }

    nameValidator = (index) => {
        return (name) => {
            const intent = this.isValidValue(name) ? null : Intent.DANGER;
            this.setArrayState("sparseColumnIntents", index, intent);
            this.setArrayState("columnNames", index, name);
        };
    };

    nameSetter = (index) => {
        return (name) => {
            this.setArrayState("columnNames", index, name);
        };
    };

    cellValidator = (rowIndex, columnIndex) => {
        const dataKey = TableComponent.dataKey(rowIndex, columnIndex);
        return (value) => {
            const intent = this.isValidValue(value) ? null : Intent.DANGER;
            this.setSparseState("sparseCellIntent", dataKey, intent);
            this.setSparseState("sparseCellData", dataKey, value);
        };
    };

    cellSetter = (rowIndex, columnIndex) => {
        const dataKey = TableComponent.dataKey(rowIndex, columnIndex);
        return (value) => {
            const intent = this.isValidValue(value) ? null : Intent.DANGER;
            this.setSparseState("sparseCellData", dataKey, value);
            this.setSparseState("sparseCellIntent", dataKey, intent);
        };
    };

    setArrayState(key, index, value) {
        const values = (this.state)[key].slice();
        values[index] = value;
        this.setState({ [key]: values });
    }

    setSparseState(stateKey, dataKey, value) {
        const stateData = (this.state)[stateKey];
        const values = { ...stateData, [dataKey]: value };
        this.setState({ [stateKey]: values });
    }

    onColumnWidthChanged(column, width) {
        const widths = this.state.columnWidths;
        widths[column] = width;
        this.setState({ columnWidths: widths });
    }
}