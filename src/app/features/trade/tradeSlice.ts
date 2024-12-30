import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PairResponse } from '@/app/types/pairs';

export interface TradeSliceState {
  pair: PairResponse;
}

const initialState: TradeSliceState = {
  pair: {
    data: {
      _id: '',
      key: '',
      title: '',
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
    setPair: create.reducer((state, action: PayloadAction<PairResponse>) => {
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
