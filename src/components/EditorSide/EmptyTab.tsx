import React from 'react';
import EmptyIcon from "../../assets/Empty.svg";

interface IEmptyTab {
    text: string | null
}

const EmptyTab : React.FC<IEmptyTab> = ({ text }) => {
    return (
        <div>
            <img src={EmptyIcon} loading='lazy'  alt="img"/>
            {text &&
                <p className="text-center text-lg">{ text }</p>
            }
        </div>
    );
};

export default EmptyTab;
