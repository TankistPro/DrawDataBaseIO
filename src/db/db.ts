import {Dexie, type EntityTable } from "dexie";
import {IRelation, ITable} from "../domain/domain.ts";

const db = new Dexie('drawDataBase') as Dexie & {
    diagrams: EntityTable<ITable, 'id'>,
    relations: EntityTable<IRelation, 'id'>
};

db.version(1).stores({
    diagrams: '++id',
    relations: '++id'
});

export { db };
