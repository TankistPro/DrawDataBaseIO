import * as React from "react";

import {ITable, ITableField} from "../../../domain/domain.ts";
import {DB_TYPES} from "../../../config/db_config.ts";
import {TableContext} from "../../../context/TableContext.tsx";

interface ITableAccordion {
    table: ITable,
    isOpen: boolean,
    toggleOpen: (id: number) => void
}

const TableAccordion : React.FC<ITableAccordion> = ({ isOpen, table, toggleOpen }) => {
    const { updateTable, addTableField } = React.useContext(TableContext);

    const updateNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        table.tableName = event.target.value;
        updateTable(table.id, table);
    }

    const updateFieldHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | React.MouseEvent<HTMLButtonElement>,
                                field: ITableField,
                                fieldType: 'name' | 'type' | 'isNull' | 'pk') => {
        const { tableField, indexOfField } = _getTableField(field);
        let value = "";

        if("value" in event.target) {
            value = event.target.value;
        }

        switch (fieldType) {
            case "name":
                tableField.name = value;
                break;
            case "type":
                tableField.type = value;
                break;
            case "isNull":
                tableField.isNull = !tableField.isNull;
                break;
            case "pk":
                tableField.pk = !tableField.pk;
                break;
        }

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
                                <li className="flex gap-2" key={index}>
                                    <input
                                        className="rounded outline-none px-2 py-1 w-full"
                                        placeholder="Name"
                                        type="text"
                                        value={f.name}
                                        onChange={(event) => updateFieldHandler(event, f, 'name')}
                                    />
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
                                    <button
                                        className={`text-sm rounded w-[29px] ${f.isNull ? "bg-blue-500 text-white" : "bg-white"} flex-shrink-0 hover:bg-blue-500 hover:text-white transition hover:transition`}
                                        onClick={(event) => updateFieldHandler(event, f, 'isNull')}
                                    >
                                        ?
                                    </button>
                                    <button
                                        className={`flex items-center justify-center rounded w-[29px] ${f.pk ? "bg-blue-500 text-white" : "bg-white"} flex-shrink-0 hover:bg-blue-500 hover:text-white transition hover:transition`}
                                        onClick={(event) => updateFieldHandler(event, f, 'pk')}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                             width="1.05em" height="1.05em" focusable="false" aria-hidden="true">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M15.3333 4C12.7277 4 10.6667 6.04265 10.6667 8.5C10.6667 9.11949 10.7959 9.70779 11.0295 10.2431L11.2965 10.855L5 17.4028V20H7.12121V17.5H9.69697V15H12.2727V12.6251H13.2727C13.3732 12.6251 13.4595 12.6407 13.4805 12.6445L13.4829 12.6449C13.519 12.6514 13.5545 12.6591 13.5832 12.6655C13.6412 12.6786 13.7115 12.6958 13.781 12.7131L13.8406 12.7279C13.9737 12.761 14.1275 12.7993 14.2956 12.8377C14.7073 12.9318 15.0949 13 15.3333 13C17.939 13 20 10.9574 20 8.5C20 6.04265 17.939 4 15.3333 4ZM8.66667 8.5C8.66667 4.88222 11.6798 2 15.3333 2C18.9869 2 22 4.88222 22 8.5C22 12.1178 18.9869 15 15.3333 15C14.9962 15 14.6124 14.9432 14.2727 14.8773V17H11.697V19.5H9.12121V22H3V16.5972L8.957 10.4024C8.76819 9.80013 8.66667 9.16107 8.66667 8.5ZM17 8.5C17 9.32843 16.3284 10 15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7C16.3284 7 17 7.67157 17 8.5Z"
                                                  fill="currentColor"></path>
                                        </svg>
                                    </button>
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
