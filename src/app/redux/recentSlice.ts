import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { payloadSearcher } from "recharts/types/chart/SunburstChart";
export interface IRecentState {
    productId: string,
}
const initialState: IRecentState[] = []
const recentSlice = createSlice({
    name: 'recent',
    initialState,
    reducers: {
        addToRecent: (state, action: PayloadAction<{ productId: string }>) => {
            const productId = action.payload.productId;
            const duplicatedProductIndex = state.findIndex((singleProduct: IRecentState, index: number) => {
                return singleProduct.productId === productId
            })
            if (duplicatedProductIndex !== -1) {
                state.splice(duplicatedProductIndex, 1)
            }
            if (state.length > 10) {
                state.shift();
            }
            state.push({ productId })
        },
        setToRecent: (state, action: PayloadAction<IRecentState[]>) => {
            return action.payload;
        }
    }
})
export const { addToRecent, setToRecent } = recentSlice.actions;
export default recentSlice.reducer