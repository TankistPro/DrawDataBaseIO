import * as React from "react";
import {ITable} from "../../domain/domain.ts";
import removeIcon from "../../assets/remove.svg";
import {EditorContext} from "../../context/useEditorContext.tsx";

interface IEditorDbTable {
    table: ITable,
}

const EditorDbTable : React.FC<IEditorDbTable> = ({ table }) => {
    const refForeignObject = React.useRef<SVGForeignObjectElement>(null);
    const refTable = React.useRef<HTMLDivElement>(null);

    const { removeTable, updateTable } = React.useContext(EditorContext);

    const [computedForeignObjectHeight, setComputedForeignObjectHeight] = React.useState<number>(0);

    const [shiftOffset, setShiftOffset] = React.useState({
        shiftX: 0,
        shiftY:0
    })

    React.useEffect(() => {
        setComputedForeignObjectHeight(refTable.current!.offsetHeight + 2)
    }, [table.fields.length])

    const mouseDownHandler = (event: React.MouseEvent ) => {
        const rect = refForeignObject.current!.getBoundingClientRect();

        const editorAsideWidth: number = document.querySelector('#aside-bar')!.clientWidth;

        const top = rect.top + scrollY
        const left = (rect.left - editorAsideWidth) + scrollX;

        setShiftOffset(prevState => {
            prevState.shiftY = event.pageY - top;
            prevState.shiftX = event.pageX - left;

            return prevState
        })

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        document.addEventListener('mousemove', moveTableHandler)

        document.addEventListener('mouseup', () => {

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            document.removeEventListener('mousemove', moveTableHandler);
        })
    }

    const moveTableHandler = (event: React.MouseEvent) => {
        table.tablePosition.x = event.pageX - shiftOffset.shiftX;
        table.tablePosition.y = event.pageY - shiftOffset.shiftY;

        updateTable(table.id, table)
    }

    return (
        <foreignObject
            width="300"
            height={computedForeignObjectHeight}
            x={table.tablePosition.x}
            y={table.tablePosition.y}
            onMouseDown={mouseDownHandler}
            ref={refForeignObject}
        >
            <div className="w-[300px] h-max bg-white rounded-xl border-2 border-sky-200 overflow-hidden cursor-move hover:border-dashed hover:border-blue-400 transition-all duration-150" ref={refTable}>
                <div className="bg-gray-50 py-2 px-2 select-none flex justify-between">
                    <p className="text-black font-bold text-xl">{ table.tableName }</p>
                    <div>
                        <button className="w-7 bg-red-400 rounded px-1 py-1 hover:bg-red-500" onClick={() => removeTable ? removeTable(table.id) : null}>
                            <img src={removeIcon} alt=""/>
                        </button>
                    </div>
                </div>
                <div>
                    <ul>
                        {table.fields.map((i, index) => (
                            <li className="flex items-center gap-2 font-medium bg-white py-1.5 px-2 select-none border-b-2 border-gray-50" key={index}>
                                <span className="rounded-full w-2.5 h-2.5 bg-sky-600 block hover:cursor-pointer"></span>
                                <p>{ i.name }</p>
                                <p className="mr-0 ml-auto font-normal text-sm text-gray-400">{ i.type }</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </foreignObject>
    );
};

export default EditorDbTable;
