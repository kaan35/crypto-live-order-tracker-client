import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PairListResponse, PairResponse } from '@/app/types/pairs';

export interface TradeSliceState {
  pair: PairResponse;
  pairsList: PairListResponse;
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
  pairsList: {
    data: [
      {
        _id: '',
        key: '',
        title: '',
        titleSeparatedBegin: '',
        titleSeparatedEnd: '',
      },
    ],
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
    setPairsList: create.reducer((state, action: PayloadAction<PairListResponse>) => {
      state.pairsList = action.payload;
    }),
  }),
  selectors: {
    selectPair: (state) => state.pair,
    selectPairsList: (state) => state.pairsList,
  },
});

export const { setPair, setPairsList } = tradeSlice.actions;

export const { selectPair, selectPairsList } = tradeSlice.selectors;

export default tradeSlice.reducer;
