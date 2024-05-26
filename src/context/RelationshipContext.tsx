import {ILinkingLine, IRelation, IRelationshipContext} from "../domain/domain.ts";
import React, {ReactElement} from "react";

interface IRelationshipContextProvider {
    children: ReactElement | JSX.Element[] | JSX.Element;
}
export const RelationshipContext = React.createContext<IRelationshipContext>({
    isLinking: false,
    relations: [],
    linkingLine: null,
    setLinkingLineHandler: () => {},
    createRelationShip: () => {},
    setIsLinking: () => {},
    removeRelationShipByTableId: () => {},
    removeRelationShip: () => {}
});

export const RelationshipContextProvider :  React.FC<IRelationshipContextProvider> = ({ children }) => {
    const [linkingLine, setLinkingLine] = React.useState<ILinkingLine | null>(null);
    const [relations, setRelations] = React.useState<IRelation[] | []>([]);
    const [isLinking, setIsLinking] = React.useState<boolean>(false);

    const setLinkingLineHandler = (link: ILinkingLine | null) => {
        if(link != null) {
            setLinkingLine(prevState => {
                return {
                    ...prevState, ...link
                }
            })
        }else {
            setLinkingLine( null)
        }
    }

    const createRelationShip = (linkingPayload: ILinkingLine) => {
        if (linkingPayload.endTableField?.tableID === linkingPayload.startTableField?.tableID) {
            console.log("Невозможно создать связь для одной и той же таблицы!")
            return
        }

        const newRelation : IRelation = {
            id: Date.now(),
            startTableField: linkingPayload.startTableField,
            endTableField: linkingPayload.endTableField
        }

        setRelations(prevState => [...prevState, newRelation])
    }

    const removeRelationShipByTableId = (tableId: number) => {
        const updatedRelations = relations.filter(r => r.endTableField.tableID != tableId && r.startTableField.tableID !== tableId);
        setRelations([...updatedRelations]);
    }

    const removeRelationShip = (relationId: number) => {
        const updatedRelations = relations.filter(r => r.id != relationId);
        setRelations([...updatedRelations]);
    }

    return (
        <RelationshipContext.Provider value={{
            isLinking,
            relations,
            linkingLine,
            setLinkingLineHandler,
            createRelationShip,
            removeRelationShipByTableId,
            setIsLinking,
            removeRelationShip
        }}>
            { children }
        </RelationshipContext.Provider>
    )
}
