import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TBurgerConstructor = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructor = {
  //начальное состояние
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      // добавляем булочку
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      //добавляем ингридиент
      state.ingredients.push({ ...action.payload, id: nanoid() });
    },
    removeIngredient: (state, action: PayloadAction<{ id: string }>) => {
      //удаляем ингридиент
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveIngredientUp: (state, action: PayloadAction<string>) => {
      //двигаем ингридиент
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      if (index > 0) {
        const [ingredient] = state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, ingredient);
      }
    },
    moveIngredientDown: (state, action: PayloadAction<string>) => {
      //двигаем игридиент
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1 && index < state.ingredients.length - 1) {
        const [ingredient] = state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, ingredient);
      }
    },
    clearConstructor: (state) => {
      //очищаем конструктор
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
