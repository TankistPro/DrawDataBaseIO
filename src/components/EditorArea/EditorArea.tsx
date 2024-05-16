import EditorDBTable from "../EditorDBTable/EditorDBTable.tsx";
import * as React from "react";
import {EditorContext} from "../../context/useEditorContext.tsx";

const EditorArea = () => {
    const { tables } = React.useContext(EditorContext);

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
                    <EditorDBTable table={item} key={item.id} />
                ))}
            </svg>
        </div>
    );
};

export default EditorArea;
