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
        setComputedForeignObjectHeight(refTable.current!.offsetHeight + 4)
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
                                <p className="text-xs text-gray-400">{ i.isNull ?
                                    '[NULL]' :
                                    i.pk ?
                                    <>
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                             width="1.5em" height="1.5em" focusable="false" aria-hidden="true">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M15.3333 4C12.7277 4 10.6667 6.04265 10.6667 8.5C10.6667 9.11949 10.7959 9.70779 11.0295 10.2431L11.2965 10.855L5 17.4028V20H7.12121V17.5H9.69697V15H12.2727V12.6251H13.2727C13.3732 12.6251 13.4595 12.6407 13.4805 12.6445L13.4829 12.6449C13.519 12.6514 13.5545 12.6591 13.5832 12.6655C13.6412 12.6786 13.7115 12.6958 13.781 12.7131L13.8406 12.7279C13.9737 12.761 14.1275 12.7993 14.2956 12.8377C14.7073 12.9318 15.0949 13 15.3333 13C17.939 13 20 10.9574 20 8.5C20 6.04265 17.939 4 15.3333 4ZM8.66667 8.5C8.66667 4.88222 11.6798 2 15.3333 2C18.9869 2 22 4.88222 22 8.5C22 12.1178 18.9869 15 15.3333 15C14.9962 15 14.6124 14.9432 14.2727 14.8773V17H11.697V19.5H9.12121V22H3V16.5972L8.957 10.4024C8.76819 9.80013 8.66667 9.16107 8.66667 8.5ZM17 8.5C17 9.32843 16.3284 10 15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7C16.3284 7 17 7.67157 17 8.5Z"
                                                  fill="currentColor"></path>
                                        </svg>
                                    </> : ''
                                }</p>
                                <p className="mr-0 ml-auto font-normal text-sm text-gray-400">{i.type}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </foreignObject>
    );
};

export default EditorDbTable;
