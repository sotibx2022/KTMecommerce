"use client";
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CheckCircle2, DollarSign } from 'lucide-react';
import ConfettiComponent from '../_components/submit/ConfettiComponent';
interface SuccessClientProps {
  orderId: string;
}
export default function PaymnetSuccess({ orderId }: SuccessClientProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const updateOrderMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/order/updateOrder', {
        orderId,
        statusValue: "Paid"
      });
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      setShowConfetti(true);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || error.message);
    }
  });
  useEffect(() => {
    updateOrderMutation.mutate();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-[var(--background)]">
        <div className="bg-background rounded-xl shadow-helper p-8 max-w-md w-full ">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle2 className="h-12 w-12 text-green-600" strokeWidth={2} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[var(--primaryDark)] mb-3">
            Payment Successful!
          </h1>
          <p className="text-lg text-[var(--primary)] mb-6">
            Thank you for your order. We've received your payment.
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <DollarSign className="h-6 w-6 text-[var(--helper)]" />
          </div>
          <button
            onClick={() => window.location.href = '/dashboard/orders'}
            className="w-full bg-[var(--primaryDark)] hover:bg-[var(--primary)] text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            View Your Orders
          </button>
        </div>
      </div>
      {showConfetti && (
        <ConfettiComponent
          link="/dashboard/orders"
          message="Congratulations, Your Order is Placed."
        />
      )}
    </>
  );
}