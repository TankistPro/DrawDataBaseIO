import * as React from "react";
import {EditorContext} from "../../context/useEditorContext.tsx";
import TableAccordion from "./TableAccordion/TableAccordion.tsx";

function EditorSide() {
    const { addTable } = React.useContext(EditorContext);

    return (
        <div className="h-full w-1/4 bg-sky-100 box-sha pt-4 px-4 pb-3 min-w-96" id="aside-bar">
            <div className="flex h-10 gap-2">
                <input
                    className="bg-white appearance-none border-1 border-sky-500
                    rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-50"
                    placeholder="Поиск..."
                    type="text"/>
                <button
                    data-tooltip-target="tooltip-default"
                    type="button"
                    className="w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => addTable()}
                >
                    Add Table
                </button>
            </div>
            <div className="mt-2">
                <TableAccordion />
            </div>
        </div>
    );
}

export default EditorSide;
