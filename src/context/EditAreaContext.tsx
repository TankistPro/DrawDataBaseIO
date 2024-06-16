import React, {ReactElement} from "react";
import {IEditAreaContext} from "../domain/domain.ts";

interface IEditAreaContextProvider {
    children: ReactElement | JSX.Element[] | JSX.Element;
}

export const EditAreaContext = React.createContext<IEditAreaContext>({
    diagramMovePosition: {
        x: 0,
        y: 0
    },
    startCursorMovePosition: {
        x: 0,
        y: 0
    },
    startDiagramPosition: {
        x: 0,
        y: 0
    },
    startMoveAreaFlag: false,
    endMoveArea: () => {},
    moveAreaHandler: () => {},
    setCursorStartMovePosition: () => {},
    setDiagramMovePosition: () => {},
    setStartDiagramPosition: () => {},
    setStartMoveAreaFlag: () => {},
    startMoveArea: () => {}
});

export const EditAreaContextProvider : React.FC<IEditAreaContextProvider> = ({ children }) => {
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

        document.addEventListener('mouseup', () => {
            // @ts-ignore
            document.removeEventListener('mousemove', moveAreaHandler);
            setStartMoveAreaFlag(false);
        })
    }
    const moveAreaHandler = (event: React.MouseEvent, diagramRef: React.RefObject<SVGGElement>) => {
        if(!startMoveAreaFlag) return;

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
        <EditAreaContext.Provider
            value={{
                startMoveAreaFlag,
                setStartMoveAreaFlag,
                diagramMovePosition,
                setDiagramMovePosition,
                startCursorMovePosition,
                setCursorStartMovePosition,
                startDiagramPosition,
                setStartDiagramPosition,
                startMoveArea,
                moveAreaHandler,
                endMoveArea
            }}
        >
            { children }
        </EditAreaContext.Provider>
    )
}
