import feedInfoReducer, {
    getFeedsThunk,
    initialState,
    addBun,
    getOrdersFeeds,
    getTotalFeeds,
    getTotalTodayFeeds
  } from './feed-info-slice';
  import { TOrder } from '@utils-types';
  
  describe('FeedInfoSlice', () => {
    it('обработка getFeeds.pending', () => {
      const action = { type: getFeedsThunk.pending.type };
      const state = feedInfoReducer(initialState, action);
      expect(state.loading).toBe(true);
    });
  
    it('обработка getFeeds.fulfilled', () => {
      const feeds = {
        orders: [
          {
            _id: 'order1',
            name: 'Order1',
            status: '',
            createdAt: '',
            updatedAt: '',
            number: 0,
            ingredients: []
          }
        ],
        total: 100,
        totalToday: 10
      };
      const action = { type: getFeedsThunk.fulfilled.type, payload: feeds };
      const state = feedInfoReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orders: feeds.orders,
        total: feeds.total,
        totalToday: feeds.totalToday,
        loading: false,
        error: null
      });
    });
  
    it('обработка getFeeds.rejected', () => {
      const action = {
        type: getFeedsThunk.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = feedInfoReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: 'Ошибка'
      });
    });
  
    it('обработка addBun', () => {
      const newOrders: TOrder[] = [
        {
          _id: 'order2',
          name: 'Bun',
          status: '',
          createdAt: '',
          updatedAt: '',
          number: 0,
          ingredients: []
        }
      ];
      const action = addBun(newOrders);
      const state = feedInfoReducer(initialState, action);
      expect(state.orders).toEqual(newOrders);
    });
  
    it('возвращение заказов', () => {
      const state = {
        feedInfo: {
          ...initialState,
          orders: [
            {
              _id: 'order3',
              name: 'Order3',
              status: '',
              createdAt: '',
              updatedAt: '',
              number: 0,
              ingredients: []
            }
          ]
        }
      };
      expect(getOrdersFeeds(state)).toEqual(state.feedInfo.orders);
    });
  
    it('возвращение total', () => {
      const state = {
        feedInfo: {
          ...initialState,
          total: 200
        }
      };
      expect(getTotalFeeds(state)).toBe(state.feedInfo.total);
    });
  
    it('возвращение totalToday', () => {
      const state = {
        feedInfo: {
          ...initialState,
          totalToday: 20
        }
      };
      expect(getTotalTodayFeeds(state)).toBe(state.feedInfo.totalToday);
    });
  });