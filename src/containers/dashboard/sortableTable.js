import * as React from "react";

import { Menu, MenuItem } from "@blueprintjs/core";
import {
    Cell,
    Column,
    ColumnHeaderCell,
    CopyCellsMenuItem,
    SelectionModes,
    Table,
    Utils,
} from "@blueprintjs/table";

// tslint:disable-next-line:no-var-requires
// const sumo = [
//     ["A", "Apple", "Ape", "Albania", "Anchorage"],
//     ["B", "Banana", "Boa", "Brazil", "Boston"],
//     ["C", "Cranberry", "Cougar", "Croatia", "Chicago"],
//     ["D", "Dragonfruit", "Deer", "Denmark", "Denver"],
//     ["E", "Eggplant", "Elk", "Eritrea", "El Paso"],
// ];

// export type ICellLookup = (rowIndex: number, columnIndex: number) => any;
// export type ISortCallback = (columnIndex: number, comparator: (a: any, b: any) => number) => void;

// export interface ISortableColumn {
    // getColumn(getCellData: ICellLookup, sortColumn: ISortCallback): JSX.Element;
// }

class TextSortableColumn { 
    constructor(name, index) {
        this.name = name,
        this.index = index
    }

    getColumn(getCellData, sortColumn) {
        const cellRenderer = (rowIndex, columnIndex) => (
            <Cell>{getCellData(rowIndex, columnIndex)}</Cell>
        );
        const menuRenderer = this.renderMenu.bind(this, sortColumn);
        const columnHeaderCellRenderer = () => <ColumnHeaderCell name={this.name} menuRenderer={menuRenderer} />;
        return (
            <Column
                cellRenderer={cellRenderer}
                columnHeaderCellRenderer={columnHeaderCellRenderer}
                key={this.index}
                name={this.name}
            />
        );
    }
    renderMenu(sortColumn) {
        const sortAsc = () => sortColumn(this.index, (a, b) => this.compare(a, b));
        const sortDesc = () => sortColumn(this.index, (a, b) => this.compare(b, a));
        return (
            <Menu>
                <MenuItem icon="sort-asc" onClick={sortAsc} text="Sort Asc" />
                <MenuItem icon="sort-desc" onClick={sortDesc} text="Sort Desc" />
            </Menu>
        );
    }

    compare(a, b) {
        return a.toString().localeCompare(b);
    }
}

export class SortableTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                new TextSortableColumn("К 1", 0),
                new TextSortableColumn("Колона 2", 1),
                new TextSortableColumn("Колона 3", 2),
                new TextSortableColumn("Колона 4", 3),
                new TextSortableColumn("Колона 5", 4),
                new TextSortableColumn("Колона 6", 5),
                new TextSortableColumn("Колона 7", 6),
                new TextSortableColumn("Колона 8", 7),
                new TextSortableColumn("Колона 9", 8),
                new TextSortableColumn("Колона 10", 9),
                new TextSortableColumn("Колона 11", 10),
                new TextSortableColumn("Колона 12", 11),
                new TextSortableColumn("Колона 13", 12),
            ],
            data: props.data,
            sortedIndexMap: [],
            columnWidths: [30, 140, 250, 100, 200, 100, 100, 100, 100, 100, 100, 100, 100],
        };
    }
   
    render() {
        const numRows = this.state.data.length;
        const columns = this.state.columns.map(col => col.getColumn(this.getCellData, this.sortColumn));
        return (
            <Table
                bodyContextMenuRenderer={this.renderBodyContextMenu}
                numRows={numRows}
                selectionModes={SelectionModes.COLUMNS_AND_CELLS}
                columnWidths={this.state.columnWidths}
            >
                {columns}
            </Table>
        );
    }

    componentWillReceiveProps(props) {
        if (props.data != undefined) {
            this.setState({ data: props.data })
        } else {
            this.setState({ data: [] });
        }
    }

    getCellData = (rowIndex, columnIndex) => {
        const sortedRowIndex = this.state.sortedIndexMap[rowIndex];
        if (sortedRowIndex != null) {
            rowIndex = sortedRowIndex;
        }
        return this.state.data[rowIndex][columnIndex];
    };

    renderBodyContextMenu = (context) => {
        return (
            <Menu>
                <CopyCellsMenuItem context={context} getCellData={this.getCellData} text="Copy" />
            </Menu>
        );
    };

    sortColumn = (columnIndex, comparator) => {
        const { data } = this.state;
        const sortedIndexMap = Utils.times(data.length, (i) => i);
        sortedIndexMap.sort((a, b) => {
            return comparator(data[a][columnIndex], data[b][columnIndex]);
        });
        this.setState({ sortedIndexMap });
    };
}