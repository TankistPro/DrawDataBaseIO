import React from "react";
import { IRelation} from "../../domain/domain.ts";
import {TableContext} from "../../context/TableContext.tsx";
import {calcRelationsPath} from "../../utils/calcRelationsPath.ts";

interface ITableRelationship {
    relation: IRelation
}

const TableRelationship: React.FC<ITableRelationship> = ({ relation }) => {
    const { tables } = React.useContext(TableContext);
    const relationRef = React.useRef<SVGPathElement>(null);

    const tablesPosition = React.useMemo(() => {
        const startTablePosition = tables.find(t => t.id === relation.startTableField.tableID);
        const endTablePosition = tables.find(t => t.id === relation.endTableField.tableID);
        return {
            startTable: {
                x: startTablePosition!.tablePosition.x,
                y: startTablePosition!.tablePosition.y
            },
            endTable: {
                x: endTablePosition!.tablePosition.x,
                y: endTablePosition!.tablePosition.y
            }
        }
    }, [relation.endTableField, relation.startTableField, tables])

    const circlePosition = () => {
        let lineLength = 0;
        const startCircle = {
            x: 0,
            y: 0
        }
        const endCircle = {
            x: 0,
            y: 0
        }
        if (relationRef.current) {
            lineLength = relationRef.current.getTotalLength();

            const startPoint =  relationRef.current.getPointAtLength(20);
            startCircle.x = startPoint.x;
            startCircle.y = startPoint.y;

            const endPoint = relationRef.current.getPointAtLength(lineLength - 20);
            endCircle.x = endPoint.x;
            endCircle.y = endPoint.y;
        }

        return {
            startCircle,
            endCircle
        };
    }

    return (
        <g>
            <path
                stroke="gray"
                className="group-hover:stroke-sky-700"
                fill="none"
                strokeWidth={2}
                cursor="pointer"
                d={calcRelationsPath(tablesPosition, relation)}
                ref={relationRef}
            />
            <>
                <circle
                    cx={circlePosition().startCircle.x}
                    cy={circlePosition().startCircle.y}
                    r="12"
                    fill="grey"
                    className="group-hover:fill-sky-700"
                />
                <text
                    x={circlePosition().startCircle.x}
                    y={circlePosition().startCircle.y}
                    fill="white"
                    strokeWidth="0.5"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                >
                    1
                </text>
                <circle
                    cx={circlePosition().endCircle.x}
                    cy={circlePosition().endCircle.y}
                    r="12"
                    fill="grey"
                    className="group-hover:fill-sky-700"
                />
                <text
                    x={circlePosition().endCircle.x}
                    y={circlePosition().endCircle.y}
                    fill="white"
                    strokeWidth="0.5"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                >
                    N
                </text>
            </>
        </g>
    );
};

export default TableRelationship;
