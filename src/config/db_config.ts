import {ITableField} from "../domain/domain.ts";

export const DB_TYPES = [
    'INT',
    'SMALLINT',
    'BIGINT',
    'FLOAT',
    'CHAR',
    'TEXT'
]

export const createBaseTableField = (position = 0): ITableField => {
    return {
        name: "",
        type: DB_TYPES[0],
        isNull: false,
        pk: false,
        position: position
    }
}

export enum BAR_TABS {
    TABLES,
    RELATIONS
}

export const TABS_LIST = {
    [BAR_TABS.TABLES]: "Tables",
    [BAR_TABS.RELATIONS]: "Relations"
}
