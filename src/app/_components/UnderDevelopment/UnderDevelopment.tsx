import { Construction } from 'lucide-react';
import React from 'react';
const UnderDevelopment: React.FC = () => {
    return (
        <div
            className="flex flex-col items-center justify-center p-8 rounded-lg text-center"
            style={{
                backgroundColor: 'var(--backgroundLight)',
                color: 'var(--primaryDark)',
            }}
        >
            <Construction
                size={48}
                className="mb-4"
                style={{ color: 'var(--helper)' }}
            />
            <h2 className="text-2xl font-bold mb-2">Feature Under Development</h2>
            <p className="text-lg">This feature is not available yet. Please check back later!</p>
        </div>
    );
};
export default UnderDevelopment;