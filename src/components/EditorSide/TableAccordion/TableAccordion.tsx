import * as React from "react";

import {ITable, ITableField} from "../../../domain/domain.ts";
import {DB_TYPES} from "../../../config/db_config.ts";
import {EditorContext} from "../../../context/useEditorContext.tsx";

interface ITableAccordion {
    table: ITable,
    isOpen: boolean,
    toggleOpen: (id: number) => void
}

const TableAccordion : React.FC<ITableAccordion> = ({ isOpen, table, toggleOpen }) => {
    const { updateTable, addTableField } = React.useContext(EditorContext);

    const updateNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        table.tableName = event.target.value;
        updateTable(table.id, table);
    }

    const updateFieldHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: ITableField, fieldType: 'name' | 'type') => {
        const { tableField, indexOfField } = _getTableField(field);

        if(fieldType === 'name') tableField.name = event.target.value
        else tableField.type = event.target.value

        _saveTableField(indexOfField, tableField);
    }

    const _getTableField = ( filed: ITableField) => {
        const indexOfField = table.fields.findIndex(f => f.name === filed.name && f.type === filed.type);
        return {
            tableField: table.fields[indexOfField],
            indexOfField
        }
    }

    const _saveTableField = (indexOfField: number, fieldToSave: ITableField) => {
        table.fields[indexOfField] = fieldToSave;
        updateTable(table.id, table);
    }

    return (
        <div>
            <div className="px">
                <div
                    onClick={() => toggleOpen(table.id)}
                    className="flex items-center justify-between cursor-pointer border-b-[1px] border-gray-300 px-2 hover:bg-gray-50 transition hover:transition hover:bg-opacity-75 py-3 rounded">
                    <p className="font-medium">{ table.tableName }</p>
                    <span className={`${ isOpen ? '' : 'rotate-180' } transition`}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                             focusable="false" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M4.08045 7.59809C4.66624 7.01231 5.61599 7.01231 6.20177 7.59809L11.8586 13.2549L17.5155 7.59809C18.1013 7.01231 19.051 7.01231 19.6368 7.59809C20.2226 8.18388 20.2226 9.13363 19.6368 9.71941L12.9193 16.4369C12.3335 17.0227 11.3838 17.0227 10.798 16.4369L4.08045 9.71941C3.49467 9.13363 3.49467 8.18388 4.08045 7.59809Z"
                                  fill="currentColor"></path>
                        </svg>
                    </span>
                </div>
                <div className={`px-2 py-3 text-sm ${isOpen ? "" : "hidden"}`}>
                    <div className="flex gap-2 items-center">
                        Name:
                        <input className="w-full bg-white rounded outline-none px-2 py-1"
                               value={table.tableName} onChange={updateNameHandler} placeholder="Table name"
                               type="text"/>
                    </div>
                    <div className="mt-3">
                        <ul className="flex flex-col gap-2">
                            {table.fields.map((f, index) => (
                                <li className="flex" key={index}>
                                    <input
                                        className="rounded outline-none px-2 py-1"
                                        placeholder="Name"
                                        type="text"
                                        value={f.name}
                                        onChange={(event) => updateFieldHandler(event, f, 'name')}
                                    />
                                    <form className="max-w-sm mx-auto">
                                        <select id="countries"
                                                className="rounded outline-none px-2 py-1 cursor-pointer"
                                                onChange={(event) => updateFieldHandler(event, f, 'type')}
                                                defaultValue={f.type}
                                        >
                                            {DB_TYPES.map((type, index) => (
                                                <option
                                                    value={type}
                                                    key={index}
                                                >{type}</option>
                                            ))}
                                        </select>
                                    </form>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-3">
                            <button
                                type="button"
                                className="w-1/4 h-[35px] text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => addTableField(table.id)}
                            >
                                Add Field
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableAccordion;
