import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderItemData } from '@/app/types/orders';

export interface TradeSliceState {
  pair: OrderItemData;
}

const initialState: TradeSliceState = {
  pair: {
    data: {
      key: '',
      titleSeparatedBegin: '',
      titleSeparatedEnd: '',
    },
    status: '',
  },
};

export const tradeSlice = createSlice({
  initialState,
  name: 'trade',
  reducers: (create) => ({
    setPair: create.reducer((state, action: PayloadAction<OrderItemData>) => {
      state.pair = action.payload;
    }),
  }),
  selectors: {
    selectPair: (state) => state.pair,
  },
});

export const { setPair } = tradeSlice.actions;

export const { selectPair } = tradeSlice.selectors;

export default tradeSlice.reducer;
