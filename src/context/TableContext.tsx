import React, {ReactElement} from "react";
import {ITable, ITableContext} from "../domain/domain.ts";
import {createBaseTableField} from "../config/db_config.ts";
import {db} from "../db/db.ts";

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
    initTableContext: () => {}
});

export const TableContextProvider: React.FC<ITableContextProvider> = ({ children }) => {
    const [tables, setTables] = React.useState<ITable[]>([]);
    const [hoveredTable, setHoveredTable] = React.useState<ITable | null>(null);

    const addTable = async () => {
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

        try {
            await db.diagrams.add(newTables);
            setTables(prevState => ([...prevState, newTables]));
        } catch (e) {
            console.error(e);
        }
    }

    const removeTable = async (tableId: number) => {
        const updatedTablesState = tables.filter(t => t.id != tableId);
        try {
            await db.diagrams.delete(tableId);
            setTables(updatedTablesState);
        } catch (e) {
            console.error(e);
        }
    }

    const updateTable = async (idTable: number, tableEntity: ITable) => {
        const indexTable = tables.findIndex((t) => t.id == idTable);
        if(indexTable != -1) {

            let table = tables[indexTable];
            table = tableEntity

            tables[indexTable] = table;

            try {
                // @ts-ignore
                await db.diagrams.update(idTable, table);
                setTables([...tables]);
            } catch (e) {
                console.error(e);
            }
        }
    }

    const addTableField = (idTable: number) => {
        const indexTable = tables.findIndex((t) => t.id == idTable);

        if(indexTable != -1) {
            const table = tables[indexTable];

            table.fields = [...table.fields, createBaseTableField(table.fields.length)];

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

    const initTableContext = async () => {
        const diagrams = await db.table('diagrams').toArray();
        setTables(diagrams);
    }

    return (
        <TableContext.Provider value={{
            tables,
            hoveredTable,
            addTable,
            removeTable,
            updateTable,
            addTableField,
            setHoveredHandler,
            initTableContext
        }}>
            { children }
        </TableContext.Provider>
    )
}
