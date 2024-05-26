import * as React from "react";

import TableAccordion from "./TableAccordion/TableAccordion.tsx";
import {TableContext} from "../../context/TableContext.tsx";
import {SideBarContext} from "../../context/SideBarContext.tsx";

import ArrowLeft from "../../assets/arrow-left.svg";
import ArrowRight from "../../assets/arrow-right.svg";
import {BAR_TABS, TABS_LIST} from "../../config/db_config.ts";
import EmptyTab from "./EmptyTab.tsx";
import {RelationshipContext} from "../../context/RelationshipContext.tsx";
import RelationshipAccordion from "./RelationshipAccordion/RelationshipAccordion.tsx";

function EditorSide() {
    const { addTable, tables } = React.useContext(TableContext);
    const { relations } = React.useContext(RelationshipContext);
    const { setActiveTab, activeTab } = React.useContext(SideBarContext);

    const { openAccordionTableID, openAccordionTable, openAccordionRelation, openAccordionRelationID } = React.useContext(SideBarContext);

    const renderTabs = () => {
        if(activeTab === BAR_TABS.TABLES && tables.length) {
            return <>
                {tables.map(t => (
                    <TableAccordion table={t} isOpen={openAccordionTableID === t.id} key={t.id} toggleOpen={openAccordionTable} />
                ))}
            </>
        } else if (activeTab === BAR_TABS.RELATIONS && relations.length) {
            return <>
                {relations.map(r => (
                    <RelationshipAccordion relation={r} isOpen={openAccordionRelationID === r.id} key={r.id} toggleOpen={openAccordionRelation} />
                ))}
            </>
        } else {
            return <EmptyTab text="Пусто" />
        }
    }

    return (
        <div className="h-full w-1/4 bg-sky-100 box-sha pt-4 px-4 pb-3 min-w-96" id="aside-bar">
            <div className="flex h-10 gap-2">
                <input
                    className="bg-white appearance-none border-1 border-sky-500
                    rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-50"
                    placeholder="Поиск..."
                    type="text"/>
                <button
                    data-tooltip-target="tooltip-default"
                    type="button"
                    className="w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => addTable()}
                >
                    Add Table
                </button>
            </div>
            <div className="mt-2">
                <div className="w-100 flex justify-between border-b-[1px] border-gray-100">
                    <div className="flex items-center cursor-pointer hover:bg-gray-50 hover:bg-opacity-90 rounded px-2">
                        <img src={ArrowLeft} alt="left"/>
                    </div>
                    <div className="flex overflow-x-scroll no-scrollbar">
                        {Object.keys(TABS_LIST).map((t_key: string) => (
                            <div
                                onClick={() => setActiveTab(Number(t_key))}
                                className={`${ activeTab == Number(t_key) ? 'bg-gray-50 ' : '' } px-6 py-1 cursor-pointer flex-shrink-0 hover:bg-gray-50 hover:bg-opacity-60 rounded-t-lg`} key={t_key}>
                                { TABS_LIST[t_key as unknown as keyof typeof TABS_LIST] }
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center cursor-pointer hover:bg-gray-50 hover:bg-opacity-90 rounded px-2">
                        <img src={ArrowRight} alt="right"/>
                    </div>
                </div>
                { renderTabs() }
            </div>
        </div>
    );
}

export default EditorSide;
