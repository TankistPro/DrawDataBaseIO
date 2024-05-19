import * as React from "react";
import { createContext, ReactElement} from "react";
import {IEditorContext, ILinkingLine, IRelation} from "../domain/domain.ts";

export const EditorContext = createContext<IEditorContext>({
    linkingLine: null,
    relations: [],
    setLinkingLineHandler: () => {},
    createRelationShip: () => {}
})

interface IEditorContextProvider {
    children: ReactElement | JSX.Element[] | JSX.Element;
}

export const EditorContextProvider: React.FC<IEditorContextProvider> = ({ children }) => {
    const [linkingLine, setLinkingLine] = React.useState<ILinkingLine | null>(null);
    const [relations, setRelations] = React.useState<IRelation[] | []>([]);

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
        console.log(linkingPayload);

        const newRelation : IRelation = {
            startTableField: linkingPayload.startTableField,
            endTableField: linkingPayload.endTableField
        }

        setRelations(prevState => [...prevState, newRelation])
    }

    return (
        <EditorContext.Provider
            value={{
                linkingLine,
                relations,
                setLinkingLineHandler,
                createRelationShip
            }}
        >
            { children }
        </EditorContext.Provider>
    )
}
