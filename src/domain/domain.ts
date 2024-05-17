export interface ITable {
    id: number,
    tableName: string,
    fields: ITableField[] | [],
    tablePosition: {
        x: number,
        y: number
    }
}

export interface ITableField {
    name: string,
    type: string | number
}

export  interface IEditorContext {
    tables: ITable[],
    addTable: (() => void),
    removeTable: ((tableId: number) => void),
    updateTable: ((idTable: number, tableEntity: ITable) => void),
    addTableField: ((tableId: number) => void)
}
