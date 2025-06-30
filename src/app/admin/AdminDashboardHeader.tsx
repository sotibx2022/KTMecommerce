'use client'
import { Badge } from '@/components/ui/badge'
import { motion, useAnimation } from 'framer-motion'
import { initial } from 'lodash'
import { Moon, Sun } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { ThemeProviderContext } from '../context/ThemeProvider'
import { generateClassName } from '../services/helperFunctions/generateClassNames'
const AdminDashboardHeader = () => {
  const context = useContext(ThemeProviderContext);
  if(!context){
    throw new Error("Theme Context is not defined here.")
  }
  const{setTheme,theme} = context;
  const [isChecked, setIsChecked] = useState(false)
  const pathname = usePathname()
  const controls = useAnimation()
  const pathSegment = pathname.split('/')[2] ?? pathname.split('/')[1];
  function handleThemeChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setTheme(isChecked?"dark":"light")
    setIsChecked(!isChecked)
    controls.start({ 
    left: isChecked ? '50%' : '0%',
    transition: { duration: 0.3 }
  })
  }
  return (
    <div className={`container flex justify-between items-center px-4 ${generateClassName(theme)}`}>
      <img src='../../assets/brand/logo.png' className='h-[50px]' />
      <div className="adminHeader">
        <Badge variant="outline">
          {pathSegment}
        </Badge>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={isChecked} onChange={handleThemeChange} hidden />
          <div className="checkBoxLabel flex bg-white p-2 rounded-md inset-2 relative">
            <div><Moon /></div>
            <div><Sun /></div>
            <motion.div
              className="background absolute top-0 left-0 w-1/2 h-full bg-primaryDark rounded-md" 
              initial={{ left: '0%' }} // Set initial position
  animate={controls}></motion.div>
          </div>
        </label>
      </div>
    </div>
  )
}
export default AdminDashboardHeader