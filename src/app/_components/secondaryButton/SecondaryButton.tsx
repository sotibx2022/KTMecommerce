import React from 'react'
interface SecondaryButtonProps {
  text: string
  icon?: string
  onClick: () => void
}
const SecondaryButton: React.FC<SecondaryButtonProps> = ({ text, icon, onClick }) => {
  return (
    <div
      className="bg-background w-[5rem] h-full flex justify-center items-center relative z-10 group rounded-sm border-[1px] border-primaryDark cursor-pointer"
      onClick={onClick} // Add onClick here to make the whole button wrapper clickable
    >
      <button className="relative z-20" type="button">
        {text}
      </button>
      <div className="overLay absolute top-0 left-0 w-0 text-primaryDark rounded-sm h-full bg-helper transition-all duration-500 ease-in-out group-hover:w-full -z-10"></div>
    </div>
  )
}
export default SecondaryButton
