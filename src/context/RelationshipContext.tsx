import {ILinkingLine, IRelation, IRelationshipContext} from "../domain/domain.ts";
import React, {ReactElement} from "react";
import {db} from "../db/db.ts";

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
    removeRelationShip: () => {},
    initRelationshipContext: () => {}
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

    const createRelationShip = async (linkingPayload: ILinkingLine) => {
        if (linkingPayload.endTableField?.tableID === linkingPayload.startTableField?.tableID) {
            console.log("Невозможно создать связь для одной и той же таблицы!")
            return
        }

        const newRelation : IRelation = {
            id: Date.now(),
            startTableField: linkingPayload.startTableField,
            endTableField: linkingPayload.endTableField
        }

        try {
            await db.relations.add(newRelation);
            setRelations(prevState => [...prevState, newRelation])
        } catch (e) {
            console.error(e);
        }
    }

    const removeRelationShipByTableId = async (tableId: number) => {
        const relationsToRemove = relations.filter(r => r.endTableField.tableID === tableId || r.startTableField.tableID === tableId);
        const updatedRelations = relations.filter(r => r.endTableField.tableID != tableId && r.startTableField.tableID !== tableId);

        try {
            setRelations([...updatedRelations]);

            for (const r of relationsToRemove) {
                await db.relations.delete(r.id);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const removeRelationShip = async (relationId: number) => {
        const updatedRelations = relations.filter(r => r.id != relationId);

        try {
            await db.relations.delete(relationId);
            setRelations([...updatedRelations]);
        } catch (e) {
            console.error(e);
        }
    }

    const initRelationshipContext = async () => {
        const relations = await db.table('relations').toArray();
        setRelations(relations);
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
            removeRelationShip,
            initRelationshipContext
        }}>
            { children }
        </RelationshipContext.Provider>
    )
}
