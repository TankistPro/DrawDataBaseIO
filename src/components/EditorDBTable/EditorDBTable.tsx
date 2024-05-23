import * as React from "react";
import {ITable, linkingTableField} from "../../domain/domain.ts";
import removeIcon from "../../assets/remove.svg";
import {TableContext} from "../../context/TableContext.tsx";
import {RelationshipContext} from "../../context/RelationshipContext.tsx";
import {SideBarContext} from "../../context/SideBarContext.tsx";
import TableRow from "./TableRows.tsx";

interface IEditorDbTable {
    table: ITable,
    startLinkingHandler: (event: React.MouseEvent, startField: linkingTableField) => void,
    endLinkingHandler: (endField: linkingTableField) => void,
    isLinking: boolean
}

const EditorDbTable : React.FC<IEditorDbTable> = ({ table, startLinkingHandler, endLinkingHandler, isLinking }) => {
    const refForeignObject = React.useRef<SVGForeignObjectElement>(null);
    const refTable = React.useRef<HTMLDivElement>(null);

    const { removeTable, updateTable, setHoveredHandler } = React.useContext(TableContext);
    const { removeRelationShip } = React.useContext(RelationshipContext);
    const { openAccordionTableID, openAccordionTable } = React.useContext(SideBarContext);

    const [computedForeignObjectHeight, setComputedForeignObjectHeight] = React.useState<number>(0);

    const [shiftOffset, setShiftOffset] = React.useState({
        shiftX: 0,
        shiftY:0
    })

    React.useEffect(() => {
        setComputedForeignObjectHeight(refTable.current!.offsetHeight + 4)
    }, [table.fields.length])

    const tableMouseDownHandler = (event: React.MouseEvent ) => {
        const target = event.target as HTMLDivElement;
        if(target.getAttribute("id") === "linkCircle" || isLinking) {
            return;
        }

        const rect = refForeignObject.current!.getBoundingClientRect();

        const editorAsideWidth: number = document.querySelector('#aside-bar')!.clientWidth;

        const top = rect.top + scrollY
        const left = (rect.left - editorAsideWidth) + scrollX;

        setShiftOffset(prevState => {
            prevState.shiftY = event.pageY - top;
            prevState.shiftX = event.pageX - left;

            return prevState
        })

        // @ts-ignore
        document.addEventListener('mousemove', moveTableHandler)

        document.addEventListener('mouseup', () => {
            // @ts-ignore
            document.removeEventListener('mousemove', moveTableHandler);
        })
    }

    const moveTableHandler = (event: React.MouseEvent) => {
        table.tablePosition.x = event.pageX - shiftOffset.shiftX;
        table.tablePosition.y = event.pageY - shiftOffset.shiftY;

        updateTable(table.id, table)
    }

    const removeTableHandler = (tableId: number) => {
        removeRelationShip(tableId);
        removeTable(tableId);
    }

    return (
        <foreignObject
            width="300"
            height={computedForeignObjectHeight}
            x={table.tablePosition.x}
            y={table.tablePosition.y}
            ref={refForeignObject}
            onMouseDown={tableMouseDownHandler}
            onMouseEnter={() => setHoveredHandler(table)}
            onMouseLeave={() => setHoveredHandler(null)}
            onDoubleClick={() => openAccordionTable(table.id)}
        >
            <div
                className={`w-[300px] h-max bg-white rounded-xl border-2 overflow-hidden 
                            ${ isLinking ? "hover:border-blue-800" : "cursor-move hover:border-dashed " } 
                            ${ openAccordionTableID === table.id ? "border-blue-500" : "border-sky-200" } 
                            hover:border-blue-400 transition-all duration-150 z-20 absolute`}
                ref={refTable}
            >
                <div className="bg-gray-50 py-2 px-2 select-none flex justify-between">
                    <p className="text-black font-bold text-xl">{ table.tableName }</p>
                    <div>
                        <button className="w-7 bg-red-400 rounded px-1 py-1 hover:bg-red-500" onClick={() => removeTableHandler(table.id)}>
                            <img src={removeIcon} alt=""/>
                        </button>
                    </div>
                </div>
                <div>
                    <TableRow
                        table={table}
                        endLinkingHandler={endLinkingHandler}
                        startLinkingHandler={startLinkingHandler}
                    />
                </div>
            </div>
        </foreignObject>
    );
};

export default EditorDbTable;
