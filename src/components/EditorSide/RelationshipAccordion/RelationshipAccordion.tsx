import React from 'react';
import {IRelation} from "../../../domain/domain.ts";
import {RelationshipContext} from "../../../context/RelationshipContext.tsx";

interface IRelationshipAccordion {
    relation: IRelation,
    isOpen: boolean,
    toggleOpen: (id: number) => void
}

const RelationshipAccordion : React.FC<IRelationshipAccordion> = ({ relation, isOpen, toggleOpen }) => {
    const { removeRelationShip } = React.useContext(RelationshipContext);

    return (
        <div>
            <div className="px">
                <div
                    onClick={() => toggleOpen(relation.id)}
                    className={`${isOpen ? "bg-gray-50 bg-opacity-75" : ""} flex items-center justify-between cursor-pointer border-b-[1px] border-gray-300 px-2 hover:bg-gray-50 transition hover:transition hover:bg-opacity-75 py-3 rounded`}>
                    <p className="font-medium">{ relation.startTableField.field.name }_{ relation.endTableField.field.name }</p>
                    <span className={`${isOpen ? '' : 'rotate-180'} transition duration-200 ease-linear`}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                             focusable="false" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M4.08045 7.59809C4.66624 7.01231 5.61599 7.01231 6.20177 7.59809L11.8586 13.2549L17.5155 7.59809C18.1013 7.01231 19.051 7.01231 19.6368 7.59809C20.2226 8.18388 20.2226 9.13363 19.6368 9.71941L12.9193 16.4369C12.3335 17.0227 11.3838 17.0227 10.798 16.4369L4.08045 9.71941C3.49467 9.13363 3.49467 8.18388 4.08045 7.59809Z"
                                  fill="currentColor"></path>
                        </svg>
                    </span>
                </div>
                <div className={`px-2 py-3 text-sm overflow-hidden ${isOpen ? "" : "hidden"} transition-all`}>
                    <div className="flex gap-2 items-center">
                        <span>
                            <b>Primary</b>: {relation.startTableField.field.name}
                        </span>
                        <span>
                            <b>Foreign</b>: {relation.endTableField.field.name}
                        </span>
                    </div>
                    <div className="mt-3">
                        <ul className="flex flex-col gap-2">
                            <li className="flex gap-2">

                            </li>
                        </ul>
                        <div className="mt-3">
                            <button
                                type="button"
                                className="w-full h-[35px] text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-1 text-center"
                                onClick={() => removeRelationShip(relation.id)}
                            >
                                Remove relation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RelationshipAccordion;
