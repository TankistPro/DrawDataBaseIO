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
    type: string | number,
    isNull: boolean,
    pk: boolean
}

export interface linkingTableField {
    tableID: number,
    field: ITableField
}

export interface ILinkingLine {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    startTableField: linkingTableField,
    endTableField: linkingTableField
}

export interface IRelation {
    startTableField: linkingTableField,
    endTableField: linkingTableField
}

export interface ITableContext {
    tables: ITable[],
    hoveredTable: ITable | null,
    addTable: (() => void),
    removeTable: ((tableId: number) => void),
    updateTable: ((idTable: number, tableEntity: ITable) => void),
    addTableField: ((tableId: number) => void),
    setHoveredHandler: ((table: ITable | null) => void),
}

export interface IRelationshipContext {
    isLinking: boolean,
    linkingLine: ILinkingLine | null,
    relations: IRelation[] | [],
    setLinkingLineHandler:((table: ILinkingLine | null) => void ),
    createRelationShip: ((linkingPayload: ILinkingLine) => void),
    setIsLinking: ((flag: boolean) => void)
}
