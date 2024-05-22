import {ISideBarContext} from "../domain/domain.ts";
import React, {ReactElement} from "react";

interface ISideBarContextProvider {
    children: ReactElement | JSX.Element[] | JSX.Element;
}

export const SideBarContext = React.createContext<ISideBarContext>({
    openAccordionTableID: null,
    openAccordionTable: () => {}
})

export const SideBarContextProvider : React.FC<ISideBarContextProvider>= ({ children }) => {
    const [openAccordionTableID, setOpenAccordionTableID] = React.useState<number | null>(null);

    const openAccordionTable = (tableID: number | null) => {
        if(tableID === openAccordionTableID) setOpenAccordionTableID(null);
        else setOpenAccordionTableID(tableID);
    }

    return (
        <SideBarContext.Provider value={{
            openAccordionTableID,
            openAccordionTable
        }}>
            { children }
        </SideBarContext.Provider>
    )
}
