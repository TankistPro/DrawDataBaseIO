import React from "react";

const ZOOM_SPEED = 0.005;
export const useEditAreaScroll = (diagramRef: React.RefObject<SVGGElement>) => {
    const [scaleValue, setScaleValue] = React.useState(1);

    const scaleEditArea = (event: React.WheelEvent) => {

        if(event.deltaY > 0) {
            setScaleValue(prev =>{
                prev = prev - ZOOM_SPEED
                return prev
            });
        } else {
            setScaleValue(prev => {
                prev = prev + ZOOM_SPEED
                return prev
            });
        }
    }

    React.useEffect(() => {
        if (!diagramRef || !diagramRef.current) return;
        diagramRef.current.style.scale = `${ scaleValue }`;
    }, [diagramRef, scaleValue])

    React.useEffect(() => {
        // if (!diagramRef || !diagramRef.current) return;
        // @ts-ignore
        document.addEventListener("wheel", scaleEditArea);

        return () => {
            // @ts-ignore
            document.removeEventListener("wheel", scaleEditArea)
        }
    }, [diagramRef])
}
