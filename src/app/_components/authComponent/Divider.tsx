import React from 'react'
interface IDivider{
    text:string
}
const Divider:React.FC<IDivider> = ({text}) => {
  return (
    <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-primaryDark"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-primaryLight text-background">{text}</span>
        </div>
      </div>
  )
}
export default Divider