import ingredientsReducer, {
    getIngredients,
    selectIngredientsData,
    selectIngredientsLoading,
    selectIngredientsError
  } from './ingredients-slice';
  import { TIngredient } from '@utils-types';
  import { initialState } from './ingredients-slice';
  
  describe('ingredientsSlice reducer', () => {
    it('возвращаем начальное состояние', () => {
      const newState = ingredientsReducer(undefined, { type: '' });
      expect(newState).toEqual(initialState);
    });
  
    it('устанавливаем loading  pending', () => {
      const action = { type: getIngredients.pending.type };
      const newState = ingredientsReducer(initialState, action);
      expect(newState.loading).toBe(true);
      expect(newState.error).toBe(false);
    });
  
    it('устанавливаем data и loading fulfilled', () => {
      const mockIngredients: TIngredient[] = [
        {
          _id: 'test-id',
          name: 'test-ingredient',
          type: 'main',
          price: 100,
          proteins: 10,
          fat: 5,
          carbohydrates: 20,
          calories: 150,
          image: 'image-url',
          image_mobile: 'image-mobile-url',
          image_large: 'image-large-url'
        }
      ];
  
      const action = {
        type: getIngredients.fulfilled.type,
        payload: mockIngredients
      };
  
      const newState = ingredientsReducer(initialState, action);
      expect(newState.loading).toBe(false);
      expect(newState.data).toEqual(mockIngredients);
      expect(newState.error).toBe(false);
    });
  
    it('устанавливаем error и loading rejected', () => {
      const action = {
        type: getIngredients.rejected.type,
        error: { message: 'Произошла ошибка' }
      };
  
      const newState = ingredientsReducer(initialState, action);
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(true);
    });
  
    it('возвращаем data', () => {
      const state = {
        ingredients: {
          ...initialState,
          data: [
            {
              _id: 'test-id',
              name: 'test-ingredient',
              type: 'main',
              price: 100,
              proteins: 10,
              fat: 5,
              carbohydrates: 20,
              calories: 150,
              image: 'image-url',
              image_mobile: 'image-mobile-url',
              image_large: 'image-large-url'
            }
          ]
        }
      };
      expect(selectIngredientsData(state)).toEqual(state.ingredients.data);
    });
  
    it('возвращаем loading', () => {
      const state = {
        ingredients: {
          ...initialState,
          loading: true
        }
      };
      expect(selectIngredientsLoading(state)).toBe(true);
    });
  
    it('возвращаем error ', () => {
      const state = {
        ingredients: {
          ...initialState,
          error: true
        }
      };
      expect(selectIngredientsError(state)).toBe(true);
    });
  });