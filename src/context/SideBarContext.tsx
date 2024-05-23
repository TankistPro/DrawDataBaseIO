import {ISideBarContext} from "../domain/domain.ts";
import React, {ReactElement} from "react";
import {BAR_TABS} from "../config/db_config.ts";

interface ISideBarContextProvider {
    children: ReactElement | JSX.Element[] | JSX.Element;
}

export const SideBarContext = React.createContext<ISideBarContext>({
    openAccordionTableID: null,
    openAccordionTable: () => {},
    activeTab: BAR_TABS.TABLES,
    setActiveTab: () => {}
})

export const SideBarContextProvider : React.FC<ISideBarContextProvider>= ({ children }) => {
    const [openAccordionTableID, setOpenAccordionTableID] = React.useState<number | null>(null);
    const [activeTab, setActiveTab] = React.useState<number>(BAR_TABS.TABLES);

    const openAccordionTable = (tableID: number | null) => {
        setActiveTab(BAR_TABS.TABLES);
        if(tableID === openAccordionTableID) setOpenAccordionTableID(null);
        else setOpenAccordionTableID(tableID);
    }

    return (
        <SideBarContext.Provider value={{
            openAccordionTableID,
            openAccordionTable,
            activeTab,
            setActiveTab
        }}>
            { children }
        </SideBarContext.Provider>
    )
}
