import * as React from "react";

import EditorDBTable from "../EditorDBTable/EditorDBTable.tsx";
import {ILinkingLine, linkingTableField} from "../../domain/domain.ts";
import TableRelationship from "../EditorDBTable/TableRelationship.tsx";
import {TableContext} from "../../context/TableContext.tsx";
import {RelationshipContext} from "../../context/RelationshipContext.tsx";

const EditorArea = () => {
    const {tables } = React.useContext(TableContext);
    const {setLinkingLineHandler, linkingLine, createRelationShip, relations, setIsLinking, isLinking } = React.useContext(RelationshipContext);

    const diagramRef = React.useRef<SVGGElement>(null);
    const [startMoveAreaFlag, setStartMoveAreaFlag] = React.useState<boolean>(false);
    const [diagramMovePosition, setDiagramMovePosition] = React.useState({
        x: 0,
        y: 0
    })
    const [startCursorMovePosition, setCursorStartMovePosition] = React.useState({
        x: 0,
        y: 0
    })
    const [startDiagramPosition, setStartDiagramPosition] = React.useState({
        x: 0,
        y: 0
    })
    const startLinkingMouseDownHandler = (event: React.MouseEvent, startField: linkingTableField) => {
        setIsLinking(true);

        const newLinkingLine: ILinkingLine = {
            x1: event.pageX - 384 - diagramMovePosition.x,
            y1: event.pageY - diagramMovePosition.y,
            x2: event.pageX - 384 - diagramMovePosition.x,
            y2: event.pageY - diagramMovePosition.y,
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
        document.body.style.cursor = "default";
    }

    const mouseUpLinkHandler = () => {
        setIsLinking(false);
        setLinkingLineHandler(null);
        document.body.style.cursor = "default";

        // @ts-ignore
        document.removeEventListener('mousemove', moveLinkHandler);
        document.removeEventListener('mouseup', mouseUpLinkHandler)
    }

    const moveLinkHandler = (event: React.MouseEvent) => {
        document.body.style.cursor = "grabbing";

        const newLinkingLine: ILinkingLine = {
            ...linkingLine as ILinkingLine,
            x2: event.pageX - 384 + 5 - diagramMovePosition.x,
            y2: event.pageY + 5 - diagramMovePosition.y
        };

        setLinkingLineHandler(newLinkingLine)
    }

    const startMoveArea = (event: React.MouseEvent) => {
        const target = event.target;

        if((target as HTMLElement).closest(".custom-table")) {
            return;
        }

        setStartMoveAreaFlag(true);

        setCursorStartMovePosition(prevState => {
            return {
                ...prevState,
                x: event.clientX,
                y: event.clientY
            }
        });

        setStartDiagramPosition(prevState => {
            return {
                ...prevState,
                x: diagramMovePosition.x,
                y: diagramMovePosition.y
            }
        })

        // @ts-ignore
        // document.addEventListener('mousemove', moveAreaHandler);

        document.addEventListener('mouseup', () => {
            // @ts-ignore
            document.removeEventListener('mousemove', moveAreaHandler);
            setStartMoveAreaFlag(false);
        })
    }
    const moveAreaHandler = (event: React.MouseEvent) => {
        if(!startMoveAreaFlag) return;

        // console.log(event.clientX - startMovePosition.x,event.pageY - startMovePosition.y );

        setDiagramMovePosition(prevState => {
            return {
                ...prevState,
                x: startDiagramPosition.x + event.clientX - startCursorMovePosition.x,
                y: startDiagramPosition.y + event.clientY - startCursorMovePosition.y
            }
        });

        if (!diagramRef || !diagramRef.current) return;
        diagramRef.current.style.transform = `translate(${ startDiagramPosition.x + (event.clientX - startCursorMovePosition.x) }px, ${  startDiagramPosition.y + (event.clientY - startCursorMovePosition.y) }px)`;

    }
    const endMoveArea = () => {
        setStartDiagramPosition(prevState => {
            return {
                ...prevState,
                x: diagramMovePosition.x,
                y: diagramMovePosition.y
            }
        })
    }

    return (
        <div
            className="w-full h-full"
            id='area'
            onMouseDown={startMoveArea}
            onMouseMove={moveAreaHandler}
            onMouseUp={endMoveArea}
        >
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

                {tables.length > 0 &&
                    <g id="diagram" ref={diagramRef}>
                        {tables.map(item => (
                            <EditorDBTable
                                table={item}
                                key={item.id}
                                startLinkingHandler={startLinkingMouseDownHandler}
                                endLinkingHandler={endLinkingMouseUpHandler}
                                isLinking={isLinking}
                                diagramMovePosition={diagramMovePosition}
                            />
                        ))}
                        {isLinking &&
                            <line strokeDasharray="4 4 4"
                                  x1={linkingLine!.x1} y1={linkingLine!.y1}
                                  x2={linkingLine!.x2} y2={linkingLine!.y2} stroke="black"/>
                        }
                        {relations?.length && relations.map(r => (
                            <TableRelationship relation={r} key={r.id} />
                        ))}
                    </g>
                }
            </svg>
        </div>
    );
};

export default EditorArea;
