import React from "react";

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
    pk: boolean,
    position: number
}

export interface linkingTableField {
    tableID: number,
    field: ITableField,
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
    id: number,
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
    initTableContext: (() => void)
}

export interface IRelationshipContext {
    isLinking: boolean,
    linkingLine: ILinkingLine | null,
    relations: IRelation[] | [],
    setLinkingLineHandler:((table: ILinkingLine | null) => void ),
    createRelationShip: ((linkingPayload: ILinkingLine) => void),
    removeRelationShipByTableId: (tableId: number) => void,
    removeRelationShip: (relationId: number) => void,
    setIsLinking: ((flag: boolean) => void),
    initRelationshipContext: (() => void)
}

export interface ISideBarContext {
    openAccordionTableID: number | null,
    openAccordionRelationID: number | null,
    openAccordionTable: (tableId: number | null) => void,
    openAccordionRelation: (relationId: number | null) => void,
    activeTab: number,
    setActiveTab: (tab: number) => void
}

interface IPosition {
    x: number,
    y: number
}

export interface IEditAreaContext {
    startMoveAreaFlag: boolean,
    setStartMoveAreaFlag: (flag: boolean) => void,
    diagramMovePosition: IPosition,
    setDiagramMovePosition: (pos: IPosition) => void,
    startCursorMovePosition: IPosition,
    setCursorStartMovePosition: (pos: IPosition) => void,
    startDiagramPosition: IPosition,
    setStartDiagramPosition: (pos: IPosition) => void,
    startMoveArea: (event: React.MouseEvent) => void,
    moveAreaHandler: (event: React.MouseEvent, diagramRef: React.RefObject<SVGGElement>) => void,
    endMoveArea: () => void
}
