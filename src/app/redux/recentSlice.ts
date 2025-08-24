"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Type for a single recent product
export interface IRecentItem {
    productId: string
}
// State is an array of IRecentItem
export type IRecentState = IRecentItem[];
const initialState: IRecentState = [];
const recentSlice = createSlice({
    name: 'recent',
    initialState,
    reducers: {
        addToRecent: (state, action: PayloadAction<{ productId: string }>) => {
            const productId = action.payload.productId;
            // Remove if already exists
            const existingIndex = state.findIndex(item => item.productId === productId);
            if (existingIndex !== -1) {
                state.splice(existingIndex, 1);
            }
            // Limit the array to 10 items
            if (state.length >= 10) {
                state.shift();
            }
            // Add new product
            state.push({ productId });
            if(typeof window !== "undefined"){
                localStorage.setItem('recentProductsArray',JSON.stringify(state))
            }
        },
        setToRecent: (state, action: PayloadAction<IRecentState>) => {
            return action.payload;
        }
    }
});
export const { addToRecent, setToRecent } = recentSlice.actions;
export default recentSlice.reducer;
