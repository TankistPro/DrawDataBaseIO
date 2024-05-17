import * as React from "react";
import { createContext, ReactElement} from "react";
import {IEditorContext, ITable} from "../domain/domain.ts";
import {createBaseTableField} from "../config/db_config.ts";

export const EditorContext = createContext<IEditorContext>({
    tables: [],
    addTable: () => {},
    removeTable: () => {},
    updateTable: () =>{},
    addTableField: () => {}
})

interface IEditorContextProvider {
    children: ReactElement | JSX.Element[] | JSX.Element;
}

export const EditorContextProvider: React.FC<IEditorContextProvider> = ({ children }) => {
    // eslint-disable-next-line prefer-const
    let [tables, setTables] = React.useState<ITable[]>([]);
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

            // tables = [...tables, table];
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <EditorContext.Provider
            value={{
                tables,
                addTable,
                removeTable,
                updateTable,
                addTableField
            }}
        >
            { children }
        </EditorContext.Provider>
    )
}
