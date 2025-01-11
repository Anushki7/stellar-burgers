import rootReducer from './RootReducer';

describe('rootReducer', () => {
  it('инициализация rootReducer с начальным состоянием', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual({
      burgerConstructor: { bun: null, ingredients: [] },
      feedInfo: {
        loading: false,
        orders: [],
        total: 0,
        totalToday: 0,
        error: null
      },
      ingredients: { data: [], loading: false, error: false },
      order: {
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
      },
      user: {
        user: null,
        isAuthChecked: false,
        isAuthorized: false,
        isLoading: false,
        error: null
      }
    });
  });
});