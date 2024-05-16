import * as React from "react";
import { createContext, ReactElement} from "react";
import {IEditorContext, ITable} from "../domain/domain.ts";

export const EditorContext = createContext<IEditorContext>({
    tables: [],
    addTable: () => {},
    removeTable: () => {},
    updateTablePosition: () =>{}
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
            tableName: "Users",
            fields:[
                {
                    name: "ID",
                    type: "INT"
                }
            ],
            tablePosition: {
                x: 50,
                y: 50
            }
        }

        setTables(prevState => ([...prevState, newTables]))
        console.log(tables)
    }

    const removeTable = (tableId: number) => {
        const updatedTablesState = tables.filter(t => t.id != tableId);
        setTables(updatedTablesState)
    }

    const updateTablePosition = (idTable: number, x: number, y: number) => {
        const indexTable = tables.findIndex((t) => t.id == idTable);
        console.log(indexTable)
        if(indexTable != -1) {

            const table = tables.splice(indexTable, 1)[0];
            table.tablePosition.x = x;
            table.tablePosition.y = y;

            tables = [...tables, table];

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
                updateTablePosition
            }}
        >
            { children }
        </EditorContext.Provider>
    )
}
