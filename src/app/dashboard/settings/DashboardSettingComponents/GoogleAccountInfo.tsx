import React from 'react'
import { Info } from 'lucide-react'
const GoogleAccountInfo = () => {
    return (
        <div>
            <div className="bg-blue-50 border-l-4 border-primaryLight p-4 mb-4 rounded text-sm">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                        <Info className="text-helper" />
                        <p className="text-primaryDark font-medium">Google Account Detected</p>
                    </div>
                    <div>
                        <p className="text-primaryLight">
                            No password set. Create one to enable email login.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GoogleAccountInfo