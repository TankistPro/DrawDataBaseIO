import React, {ReactElement} from "react";
import {ITable, ITableContext} from "../domain/domain.ts";
import {createBaseTableField} from "../config/db_config.ts";

interface ITableContextProvider {
    children: ReactElement | JSX.Element[] | JSX.Element;
}

export const TableContext = React.createContext<ITableContext>({
    tables: [],
    hoveredTable: null,
    addTable: () => {},
    removeTable: () => {},
    updateTable: () =>{},
    addTableField: () => {},
    setHoveredHandler: () => {},
});

export const TableContextProvider: React.FC<ITableContextProvider> = ({ children }) => {
    const [tables, setTables] = React.useState<ITable[]>([]);
    const [hoveredTable, setHoveredTable] = React.useState<ITable | null>(null);

    const addTable = () => {
        const newTables: ITable = {
            id: Date.now(),
            tableName: `Table_${tables.length + 1}`,
            fields:[createBaseTableField()],
            tablePosition: {
                x: 50,
                y: 50
            }
        }

        newTables.fields[0].name = "ID";
        newTables.fields[0].isNull = false;
        newTables.fields[0].pk = true;

        setTables(prevState => ([...prevState, newTables]))
    }

    const removeTable = (tableId: number) => {
        const updatedTablesState = tables.filter(t => t.id != tableId);
        setTables(updatedTablesState)
    }

    const updateTable = (idTable: number, tableEntity: ITable) => {
        const indexTable = tables.findIndex((t) => t.id == idTable);
        if(indexTable != -1) {

            let table = tables[indexTable];
            table = tableEntity

            tables[indexTable] = table;

            setTables([...tables])
        }
    }

    const addTableField = (idTable: number) => {
        const indexTable = tables.findIndex((t) => t.id == idTable);

        if(indexTable != -1) {
            const table = tables[indexTable];

            table.fields = [...table.fields, createBaseTableField()];

            setTables([...tables])
        }
    }

    const setHoveredHandler = (table: ITable | null) => {
        if(table != null) {
            setHoveredTable(prevState => {
                return {
                    ...prevState, ...table
                }
            })
        } else {
            setHoveredTable(null)
        }
    }

    return (
        <TableContext.Provider value={{
            tables,
            hoveredTable,
            addTable,
            removeTable,
            updateTable,
            addTableField,
            setHoveredHandler
        }}>
            { children }
        </TableContext.Provider>
    )
}
