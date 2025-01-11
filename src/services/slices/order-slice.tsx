import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi, getOrdersApi, getOrderByNumberApi } from '@api';
import { clearConstructor } from './burger-constructor-slice';
import { RootState } from '../store';

export const initialOrderState: OrderState = {
  currentOrder: null,
  orderHistory: null,
  isOrderLoading: false,
  hasOrderError: false,
  isOrderHistoryLoading: false,
  hasOrderHistoryError: false,
  errorMessage: '',
  historyErrorMessage: '',
  orderData: null,
  isOrderDetailsLoading: false
};

export interface OrderState {
  currentOrder: TOrder | null;
  orderHistory: TOrder[] | null;
  isOrderLoading: boolean;
  hasOrderError: boolean;
  isOrderHistoryLoading: boolean;
  hasOrderHistoryError: boolean;
  errorMessage: string | undefined;
  historyErrorMessage: string;
  orderData: null | TOrder;
  isOrderDetailsLoading: boolean;
}

export const initiateOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>( // создания нового заказа
  'order/initiate',
  async (ingredients: string[], { dispatch, rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      dispatch(clearConstructor());
      return response.order;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Неизвестная ошибка';
      return rejectWithValue(message);
    }
  }
);

export const getUserOrderHistory = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('order/getUserOrderHistory', async (_, { rejectWithValue }) => {
  // истории заказов пользователя
  try {
    const orders = await getOrdersApi();
    return orders;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Неизвестная ошибка';
    return rejectWithValue(message);
  }
});

// AsyncThunk  по номеру
export const getOrderDetailsByNumber = createAsyncThunk(
  'order/getOrderDetailsByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderState,
  reducers: {
    closeOrder(state) {
      state.currentOrder = null;
    }
  },
  selectors: {
    selectOrder: (state) => state.orderData,
    selectIsLoading: (state) => state.isOrderLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateOrder.pending, (state) => {
        // Обработка создания заказа
        state.isOrderLoading = true;
        state.hasOrderError = false;
        state.errorMessage = undefined;
      })
      .addCase(initiateOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.isOrderLoading = false;
      })
      .addCase(initiateOrder.rejected, (state, action) => {
        state.hasOrderError = true;
        state.isOrderLoading = false;
        state.errorMessage = action.error?.message; //
      })

      .addCase(getUserOrderHistory.pending, (state) => {
        // Обработка получения истории заказов
        state.isOrderHistoryLoading = true;
        state.hasOrderHistoryError = false;
        state.errorMessage = undefined; //
      })
      .addCase(getUserOrderHistory.fulfilled, (state, action) => {
        state.orderHistory = action.payload;
        state.isOrderHistoryLoading = false;
      })
      .addCase(getUserOrderHistory.rejected, (state, action) => {
        state.hasOrderHistoryError = true;
        state.isOrderHistoryLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(getOrderDetailsByNumber.pending, (state) => {
        // Обработка получения заказа по номеру
        state.isOrderDetailsLoading = true;
        state.hasOrderHistoryError = false;
        state.errorMessage = undefined;
      })
      .addCase(getOrderDetailsByNumber.fulfilled, (state, action) => {
        state.orderData = action.payload.orders[0];
        state.isOrderDetailsLoading = false;
      })
      .addCase(getOrderDetailsByNumber.rejected, (state, action) => {
        state.hasOrderHistoryError = true;
        state.isOrderDetailsLoading = false;
        state.errorMessage = action.error.message;
      });
  }
});

export const selectCurrentOrder = (state: RootState) =>
  state.order.currentOrder;
export const selectIsOrderLoading = (state: RootState) =>
  state.order.isOrderLoading;
export const selectHasOrderError = (state: RootState) =>
  state.order.hasOrderError;
export const selectErrorMessage = (state: RootState) =>
  state.order.errorMessage;
export const selectOrdersData = (state: RootState) => state.order.orderHistory;

export const ordersSelector = (state: RootState) => state.order;

export const ordersDataSelector = (state: RootState) =>
  state.order.orderHistory;

export const ordersInfoDataSelector =
  (number: string) => (state: RootState) => {
    //  получение данных конкретного заказа
    if (state.order.orderHistory && state.order.orderHistory.length > 0) {
      const data = state.order.orderHistory.find(
        (item: { number: number }) => item.number === +number
      );
      if (data) return data;
    }
    if (state.feedInfo.orders && state.feedInfo.orders.length > 0) {
      const data = state.feedInfo.orders.find(
        (item: { number: number }) => item.number === +number
      );
      if (data) return data;
    }
    return null;
  };

export const { closeOrder } = orderSlice.actions;
export const { selectOrder, selectIsLoading } = orderSlice.selectors;
export default orderSlice.reducer;
