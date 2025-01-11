import orderReducer, { initiateOrder, getUserOrderHistory } from './order-slice';
import { initialOrderState } from './order-slice';

describe('OrderSlice', () => {
    it('обработка createOrder.pending', () => {
      const action = { type: initiateOrder.pending.type };
      const state = orderReducer(initialOrderState, action);
      expect(state).toEqual({
        ...initialOrderState,
        isOrderLoading: true,
        hasOrderError: false,
        errorMessage: undefined
      });
    });
  
    it('обработка createOrder.fulfilled', () => {
      const order = { id: '123', ingredients: [] };
      const action = { type: initiateOrder.fulfilled.type, payload: order };
      const state = orderReducer(initialOrderState, action);
      expect(state).toEqual({
        ...initialOrderState,
        currentOrder: order,
        isOrderLoading: false
      });
    });
  
    it('обработка createOrder.rejected', () => {
      const action = { type: initiateOrder.rejected.type };
      const state = orderReducer(initialOrderState, action);
      expect(state).toEqual({
        ...initialOrderState,
        isOrderLoading: false,
        hasOrderError: true,
        errorMessage: undefined
      });
    });
  
    it('обработка fetchUserOrders.fulfilled', () => {
      const ordersHistory = [{ id: 'order1' }, { id: 'order2' }];
      const action = {
        type: getUserOrderHistory.fulfilled.type,
        payload: ordersHistory
      };
      const state = orderReducer(initialOrderState, action);
      expect(state).toEqual({
        ...initialOrderState,
        orderHistory: ordersHistory,
        isOrderHistoryLoading: false
      });
    });
  });