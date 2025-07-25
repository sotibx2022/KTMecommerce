"use client";
import { config } from '@/config/configuration';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
interface PaymentErrorProps {
    error: Error;
    orderId?: string;
}
export default function PaymentError({ error, orderId }: PaymentErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-[var(--background)]">
            <div className="bg-background rounded-xl shadow-helper p-8 max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-100 p-4 rounded-full">
                        <AlertCircle className="h-12 w-12 text-red-600" strokeWidth={2} />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-[var(--primaryDark)] mb-3">
                    Payment Processing Error
                </h1>
                <div className="text-red-600 mb-6">
                    <p className="text-lg">{error.message}</p>
                    <p className="mt-2">Please contact support with your order details.</p>
                </div>
                <div className="flex flex-col gap-3">
                    <Link
                        href={`${config.websiteUrl}/catalog/advanceSearch?highlighted=none`}
                        className="w-full bg-[var(--primaryDark)] hover:bg-[var(--primary)] text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                        Order Again
                    </Link>
                    <Link
                        href={`${config.websiteUrl}/pages/contact`}
                        className="w-full border border-[var(--primaryLight)] text-[var(--primaryDark)] font-medium py-2 px-4 rounded-lg transition duration-200 hover:bg-gray-50"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}