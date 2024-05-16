export interface ITable {
    id: number,
    tableName: string,
    fields: ITableField[] | [],
    tablePosition: {
        x: number,
        y: number
    }
}

interface ITableField {
    name: string,
    type: string | number
}

export  interface IEditorContext {
    tables: ITable[],
    addTable: (() => void),
    removeTable: ((tableId: number) => void),
    updateTablePosition: ((idTable: number, x: number, y: number) => void)
}
