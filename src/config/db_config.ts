import {ITableField} from "../domain/domain.ts";

export const DB_TYPES = [
    'INT',
    'SMALLINT',
    'BIGINT',
    'FLOAT',
    'CHAR',
    'TEXT'
]

export const createBaseTableField = (): ITableField => {
    return {
        name: "",
        type: DB_TYPES[0],
        isNull: false,
        pk: false
    }
}
