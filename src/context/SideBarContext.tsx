import {ISideBarContext} from "../domain/domain.ts";
import React, {ReactElement} from "react";
import {BAR_TABS} from "../config/db_config.ts";

interface ISideBarContextProvider {
    children: ReactElement | JSX.Element[] | JSX.Element;
}

export const SideBarContext = React.createContext<ISideBarContext>({
    openAccordionTableID: null,
    openAccordionRelationID: null,
    openAccordionTable: () => {},
    openAccordionRelation: () => {},
    activeTab: BAR_TABS.TABLES,
    setActiveTab: () => {}
})

export const SideBarContextProvider : React.FC<ISideBarContextProvider>= ({ children }) => {
    const [openAccordionRelationID, setOpenAccordionRelationID] = React.useState<number | null>(null);
    const [openAccordionTableID, setOpenAccordionTableID] = React.useState<number | null>(null);
    const [activeTab, setActiveTab] = React.useState<number>(BAR_TABS.TABLES);

    const openAccordionTable = (tableID: number | null) => {
        setActiveTab(BAR_TABS.TABLES);
        if(tableID === openAccordionTableID) setOpenAccordionTableID(null);
        else setOpenAccordionTableID(tableID);
    }

    const openAccordionRelation = (relationId: number | null) => {
        setActiveTab(BAR_TABS.RELATIONS);
        if(relationId === openAccordionRelationID) setOpenAccordionRelationID(null);
        else setOpenAccordionRelationID(relationId);
    }

    return (
        <SideBarContext.Provider value={{
            openAccordionTableID,
            openAccordionRelationID,
            openAccordionTable,
            openAccordionRelation,
            activeTab,
            setActiveTab
        }}>
            { children }
        </SideBarContext.Provider>
    )
}
