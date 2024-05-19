import EditorDBTable from "../EditorDBTable/EditorDBTable.tsx";
import * as React from "react";
import {EditorContext} from "../../context/useEditorContext.tsx";
import {ILinkingLine, linkingTableField} from "../../domain/domain.ts";
import TableRelationship from "../EditorDBTable/TableRelationship.tsx";
import {TableContext} from "../../context/TableContext.tsx";

const EditorArea = () => {
    const {setLinkingLineHandler, linkingLine, createRelationShip, relations } = React.useContext(EditorContext);
    const {tables } = React.useContext(TableContext);

    const [isLinking, setIsLinking] = React.useState<boolean>(false);
    const startLinkingMouseDownHandler = (event: React.MouseEvent, startField: linkingTableField) => {
        setIsLinking(true);

        const newLinkingLine: ILinkingLine = {
            x1: event.pageX - 384,
            y1: event.pageY,
            x2: event.pageX - 384,
            y2: event.pageY,
            startTableField: startField,
            endTableField: startField
        };

        setLinkingLineHandler(newLinkingLine);

        // @ts-ignore
        document.addEventListener('mousemove', moveLinkHandler);
        document.addEventListener('mouseup', mouseUpLinkHandler);
    }

    const endLinkingMouseUpHandler = (endField: linkingTableField) => {
        const linkingPayload : ILinkingLine = {
            ...linkingLine as ILinkingLine,
            endTableField: endField
        }
        setLinkingLineHandler(linkingPayload)

        createRelationShip(linkingPayload);
    }

    const mouseUpLinkHandler = () => {
        setIsLinking(false);
        setLinkingLineHandler(null);

        // @ts-ignore
        document.removeEventListener('mousemove', moveLinkHandler);
        document.removeEventListener('mouseup', mouseUpLinkHandler)
    }

    const moveLinkHandler = (event: React.MouseEvent) => {
        document.body.style.cursor = "grabbing";

        const newLinkingLine: ILinkingLine = {
            ...linkingLine as ILinkingLine,
            x2: event.pageX - 384 + 5,
            y2: event.pageY + 5
        };

        setLinkingLineHandler(newLinkingLine)
    }

    return (
        <div className="w-full h-full" id='area'>
            <svg className="w-full h-full">
                <defs>
                    <pattern
                        id="pattern-circles"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                        patternContentUnits="userSpaceOnUse"
                    >
                        <circle
                            id="pattern-circle"
                            cx="5"
                            cy="5"
                            r="0.85"
                            fill="rgb(99, 152, 191)"
                        ></circle>
                    </pattern>
                </defs>
                <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="url(#pattern-circles)"
                ></rect>
                {tables.map(item => (
                    <EditorDBTable
                        table={item}
                        key={item.id}
                        startLinkingHandler={startLinkingMouseDownHandler}
                        endLinkingHandler={endLinkingMouseUpHandler}
                        isLinking={isLinking}
                    />
                ))}
                {isLinking &&
                    <line strokeDasharray="4 4 4" x1={linkingLine?.x1} y1={linkingLine?.y1}
                          x2={linkingLine?.x2} y2={linkingLine?.y2} stroke="black"/>
                }
                {relations?.length && relations.map((r, index) => (
                    <TableRelationship relation={r} key={index} />
                ))}
            </svg>
        </div>
    );
};

export default EditorArea;
