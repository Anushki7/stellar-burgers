import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export type IIngredientsState = {
  data: TIngredient[];
  loading: boolean;
  error: boolean;
};

const initialState: IIngredientsState = {
  //начальное состояние
  data: [],
  loading: false,
  error: false
};

export const getIngredients = createAsyncThunk<TIngredient[]>(
  //запрос на сервер
  'ingredient/get',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.error = false;
          state.data = action.payload;
        }
      )
      .addCase(getIngredients.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

export const selectIngredientsData = (state: {
  ingredients: IIngredientsState;
}) => state.ingredients.data; //селекторы

export const selectIngredientsLoading = (state: {
  ingredients: IIngredientsState;
}) => state.ingredients.loading;

export const selectIngredientsError = (state: {
  ingredients: IIngredientsState;
}) => state.ingredients.error;

export default ingredientsSlice.reducer;
