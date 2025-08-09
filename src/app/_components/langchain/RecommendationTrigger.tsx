import { DisplayContext } from '@/app/context/DisplayComponents'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import React, { useContext } from 'react'
const RecommendationTrigger = () => {
    const context = useContext(DisplayContext);
    if (!context) {
        throw new Error("Display Components contexts are not defined at this label.")
    }
    const { setVisibleComponent } = context;
    return (
        <div>
            <button className="recommendationbtn button-pulse flex" onClick={() => setVisibleComponent('recommendation')}>
                <Sparkles />
            </button>
            </div>
    )
}
export default RecommendationTrigger