"use client"
import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
interface ProductDeleteContextType {
  isPending: boolean;
  deleteProduct: (productId: string) => void;
}
const initialProductDeleteContext: ProductDeleteContextType = {
  isPending: false,
  deleteProduct: () => {
    console.warn("No ProductDeleteProvider found");
  }
};
const ProductDeleteContext = createContext<ProductDeleteContextType>(initialProductDeleteContext);
interface ProductDeleteProviderProps {
  children: React.ReactNode;
}
export const ProductDeleteProvider: React.FC<ProductDeleteProviderProps> = ({ children }) => {
    const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (productId: string) => {
      const response = await axios.post('/api/products/deleteProduct', { productId });
      return response.data;
    },
    onSuccess: async (response) => {
        router.push('/admin/products');
      toast.success(response.message || 'Product deleted successfully');
      await queryClient.invalidateQueries({ 
        queryKey: ['products'],
        refetchType: 'active' 
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || error.message || 'Failed to delete product');
    }
  });
  const contextValue: ProductDeleteContextType = {
    isPending,
    deleteProduct: mutate
  };
  return (
    <ProductDeleteContext.Provider value={contextValue}>
      {children}
    </ProductDeleteContext.Provider>
  );
};
export const useProductDelete = (): ProductDeleteContextType => {
  return useContext(ProductDeleteContext);
};