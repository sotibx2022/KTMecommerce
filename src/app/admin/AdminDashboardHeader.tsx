'use client'
import { Badge } from '@/components/ui/badge'
import { motion, useAnimation } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { ThemeProviderContext } from '../context/ThemeProvider'
import { generateClassName } from '../services/helperFunctions/generateClassNames'
import LogoComponent from '../_components/logoComponent/LogoComponent'
const AdminDashboardHeader = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) {
    throw new Error("Theme Context is not defined here.")
  }
  const { setTheme, theme } = context
  const [isChecked, setIsChecked] = useState(theme === "dark")
  const controls = useAnimation()
  const pathname = usePathname()
  const pathSegment = pathname.split('/')[2] ?? pathname.split('/')[1]
  useEffect(() => {
    // Sync local state with context value
    setIsChecked(theme === "dark")
    controls.start({
      left: theme === "dark" ? '50%' : '0%',
      transition: { duration: 0.3 }
    })
  }, [theme])
  function handleThemeChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const newValue = !isChecked
    setIsChecked(newValue)
    setTheme(newValue ? "dark" : "light");
    if(typeof window !== 'undefined'){
      localStorage.setItem('adminTheme',theme)
    }
  }
  return (
    <div className={` flex justify-between items-center px-4 ${generateClassName(theme)}`}>
      <LogoComponent theme={theme} />
      <div className="adminHeader flex items-center gap-2">
        <Badge variant="outline">
          {pathSegment}
        </Badge>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleThemeChange}
            hidden
          />
          <div
            className="relative flex w-16 h-8 rounded-md items-center justify-between px-1
               bg-white shadow-inner border border-gray-200"
          >
            {/* sliding highlight */}
            <motion.div
              className="absolute top-0 left-0 w-1/2 h-full bg-helper rounded-md z-0 shadow-md"
              initial={{ left: theme === "dark" ? "50%" : "0%" }}
              animate={controls}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            {/* sun icon */}
            <div className="text-primaryLight h-5 w-5 z-10">
              <Sun />
            </div>
            {/* moon icon */}
            <div className="text-primaryLight h-5 w-5 z-10">
              <Moon />
            </div>
          </div>
        </label>
      </div>
    </div>
  )
}
export default AdminDashboardHeader
