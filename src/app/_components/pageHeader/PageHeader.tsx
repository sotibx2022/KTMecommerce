import { LucideIcon } from 'lucide-react'
import React from 'react'
interface IPageHeader {
    icon?: LucideIcon,
    headerText: string,
    headerTagline?: string,
}
const PageHeader: React.FC<IPageHeader> = ({ icon: Icon, headerText, headerTagline }) => {
    return (
        <div className="my-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center text-center">
            {Icon && <div className="mb-4 sm:mb-8">
                 <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl flex items-center justify-center shadow-primaryDark">
                    <Icon className="w-8 sm:w-10 h-8 sm:h-10 text-primaryDark" />
                </div>
            </div>}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-2 sm:mb-6">
                <span className="block bg-gradient-to-r from-primaryDark to-helper bg-clip-text text-transparent">
                    {headerText}
                </span>
                {headerTagline && (
                    <p className="mt-2 text-base sm:text-lg text-muted-foreground">
                        {headerTagline}
                    </p>
                )}
            </h1>
        </div>
    )
}
export default PageHeader
