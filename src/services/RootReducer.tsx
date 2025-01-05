import { combineReducers } from '@reduxjs/toolkit';

import burgerConstructorSlice from './slices/burger-constructor-slice';
import feedInfoSlice from './slices/feed-info-slice';
import ingredientsSlice from './slices/ingredients-slice';
import orderSlice from './slices/order-slice';
import userSlice from './slices/user-slice';

const rootReducer = combineReducers({
    burgerConstructor: burgerConstructorSlice,
    feedInfo: feedInfoSlice,
    ingredients: ingredientsSlice,
    order: orderSlice,
    user: userSlice
}); // Заменить на импорт настоящего редьюсера

export default rootReducer;
