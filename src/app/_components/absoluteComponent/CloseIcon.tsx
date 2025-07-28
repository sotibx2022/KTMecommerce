import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
interface ICloseIcon {
    onClick: () => void;
}
const CloseIcon: React.FC<ICloseIcon> = ({ onClick }) => {
    return (
        <div>
            <FontAwesomeIcon
                icon={faTimes}
                onClick={onClick} // ✅ Add the click handler here
                className="text-background bg-helper w-[30px] h-[30px] z-10 absolute top-3 right-3 cursor-pointer rounded-full p-1"
            />
        </div>
    )
}
export default CloseIcon
