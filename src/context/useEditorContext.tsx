import * as React from "react";
import { createContext, ReactElement} from "react";
import {IEditorContext, ILinkingLine, IRelation, ITable} from "../domain/domain.ts";
import {createBaseTableField} from "../config/db_config.ts";

export const EditorContext = createContext<IEditorContext>({
    tables: [],
    hoveredTable: null,
    linkingLine: null,
    relations: [],
    addTable: () => {},
    removeTable: () => {},
    updateTable: () =>{},
    addTableField: () => {},
    setHoveredHandler: () => {},
    setLinkingLineHandler: () => {},
    createRelationShip: () => {}
})

interface IEditorContextProvider {
    children: ReactElement | JSX.Element[] | JSX.Element;
}

export const EditorContextProvider: React.FC<IEditorContextProvider> = ({ children }) => {
    const [tables, setTables] = React.useState<ITable[]>([]);
    const [hoveredTable, setHoveredTable] = React.useState<ITable | null>(null);
    const [linkingLine, setLinkingLine] = React.useState<ILinkingLine | null>(null);
    const [relations, setRelations] = React.useState<IRelation[] | []>([]);

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

    const setLinkingLineHandler = (link: ILinkingLine | null) => {
        if(link != null) {
            setLinkingLine(prevState => {
                return {
                    ...prevState, ...link
                }
            })
        }else {
            setLinkingLine( null)
        }
    }

    const createRelationShip = (linkingPayload: ILinkingLine) => {
        if (linkingPayload.endTableField?.tableID === linkingPayload.startTableField?.tableID) {
            console.log("Невозможно создать связь для одной и той же таблицы!")
            return
        }
        console.log(linkingPayload);

        const newRelation : IRelation = {
            startTableField: linkingPayload.startTableField,
            endTableField: linkingPayload.endTableField
        }

        setRelations(prevState => [...prevState, newRelation])
    }

    return (
        <EditorContext.Provider
            value={{
                tables,
                hoveredTable,
                linkingLine,
                relations,
                addTable,
                removeTable,
                updateTable,
                addTableField,
                setHoveredHandler,
                setLinkingLineHandler,
                createRelationShip
            }}
        >
            { children }
        </EditorContext.Provider>
    )
}
