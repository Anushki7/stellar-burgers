import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

export interface IFeedInfoState {
  loading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
}

export const initialState: IFeedInfoState = {
  //начальное состояние компонента
  loading: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};

export const feedInfoSlice = createSlice({
  name: 'feedInfo',
  initialState,
  selectors: {
    getOrdersFeeds: (state) => state.orders,
    getTotalFeeds: (state) => state.total,
    getTotalTodayFeeds: (state) => state.totalToday
  },
  reducers: {
    addBun: (state, action) => {
      state.orders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedsThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getFeedsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });

    builder.addCase(getFeedsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error';
    });
  }
});

export const getFeedsThunk = createAsyncThunk('feedInfo/getfeeds', async () => {
  //получение данных с api
  const response = await getFeedsApi();
  return response;
});

export const { addBun } = feedInfoSlice.actions;

export default feedInfoSlice.reducer;

export const { getOrdersFeeds, getTotalFeeds, getTotalTodayFeeds } =
  feedInfoSlice.selectors;
