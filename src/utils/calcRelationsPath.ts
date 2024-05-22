import {IRelation} from "../domain/domain.ts";

export const calcRelationsPath = (tablesPosition: any, relation: IRelation): string | undefined=> {
    const zoom = 1;
    const tableWidth = 300;
    const width = tableWidth * zoom;

    const x1 = tablesPosition.startTable.x;
    const y1 = tablesPosition.startTable.y + 46 + relation.startTableField.field.position * 38 + 38 / 2;

    const x2 = tablesPosition.endTable.x;
    const y2 = tablesPosition.endTable.y + 46 + relation.endTableField.field.position * 38 + 38 / 2;

    let radius = 10 * zoom;
    const midX = (x2 + x1 + width) / 2;
    const endX = x2 + width < x1 ? x2 + width : x2;

    if (Math.abs(y1 - y2) <= 36 * zoom) {
        radius = Math.abs(y2 - y1) / 3;
        if (radius <= 2) {
            if (x1 + width <= x2) return `M ${x1 + width} ${y1} L ${x2} ${y2 + 0.1}`;
            else if (x2 + width < x1)
                return `M ${x1} ${y1} L ${x2 + width} ${y2 + 0.1}`;
        }
    }
    if (y1 <= y2) {
        if (x1 + width <= x2) {
            return `M ${x1 + width} ${y1} L ${
                midX - radius
            } ${y1} A ${radius} ${radius} 0 0 1 ${midX} ${y1 + radius} L ${midX} ${
                y2 - radius
            } A ${radius} ${radius} 0 0 0 ${midX + radius} ${y2} L ${endX} ${y2}`;
        } else if (x2 <= x1 + width && x1 <= x2) {
            return `M ${x1 + width} ${y1} L ${
                x2 + width
            } ${y1} A ${radius} ${radius} 0 0 1 ${x2 + width + radius} ${
                y1 + radius
            } L ${x2 + width + radius} ${y2 - radius} A ${radius} ${radius} 0 0 1 ${
                x2 + width
            } ${y2} L ${x2 + width} ${y2}`;
        } else if (x2 + width >= x1 && x2 + width <= x1 + width) {
            return `M ${x1} ${y1} L ${
                x2 - radius
            } ${y1} A ${radius} ${radius} 0 0 0 ${x2 - radius - radius} ${
                y1 + radius
            } L ${x2 - radius - radius} ${y2 - radius} A ${radius} ${radius} 0 0 0 ${
                x2 - radius
            } ${y2} L ${x2} ${y2}`;
        } else {
            return `M ${x1} ${y1} L ${
                midX + radius
            } ${y1} A ${radius} ${radius} 0 0 0 ${midX} ${y1 + radius} L ${midX} ${
                y2 - radius
            } A ${radius} ${radius} 0 0 1 ${midX - radius} ${y2} L ${endX} ${y2}`;
        }
    } else {
        if (x1 + width <= x2) {
            return `M ${x1 + width} ${y1} L ${
                midX - radius
            } ${y1} A ${radius} ${radius} 0 0 0 ${midX} ${y1 - radius} L ${midX} ${
                y2 + radius
            } A ${radius} ${radius} 0 0 1 ${midX + radius} ${y2} L ${endX} ${y2}`;
        } else if (x1 + width >= x2 && x1 + width <= x2 + width) {
            return `M ${x1} ${y1} L ${
                x1 - radius - radius
            } ${y1} A ${radius} ${radius} 0 0 1 ${x1 - radius - radius - radius} ${
                y1 - radius
            } L ${x1 - radius - radius - radius} ${
                y2 + radius
            } A ${radius} ${radius} 0 0 1 ${
                x1 - radius - radius
            } ${y2} L ${endX} ${y2}`;
        } else if (x1 >= x2 && x1 <= x2 + width) {
            return `M ${x1 + width} ${y1} L ${
                x1 + width + radius
            } ${y1} A ${radius} ${radius} 0 0 0 ${x1 + width + radius + radius} ${
                y1 - radius
            } L ${x1 + width + radius + radius} ${
                y2 + radius
            } A ${radius} ${radius} 0 0 0 ${x1 + width + radius} ${y2} L ${
                x2 + width
            } ${y2}`;
        } else {
            return `M ${x1} ${y1} L ${
                midX + radius
            } ${y1} A ${radius} ${radius} 0 0 1 ${midX} ${y1 - radius} L ${midX} ${
                y2 + radius
            } A ${radius} ${radius} 0 0 0 ${midX - radius} ${y2} L ${endX} ${y2}`;
        }
    }
}
