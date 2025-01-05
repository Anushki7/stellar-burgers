import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';
import {
  TRegisterData,
  TLoginData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '@api';

export interface IUserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthorized: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  // Начальное состояние
  user: null,
  isAuthChecked: false,
  isAuthorized: false,
  isLoading: false,
  error: null
};

export const registerUser = createAsyncThunk(
  //регистрация пользователя
  'user/registerUser',
  (registerData: TRegisterData) => registerUserApi(registerData)
);

export const loginUser = createAsyncThunk(
  //авторизация
  'user/loginUser',
  (loginData: TLoginData) => loginUserApi(loginData)
);

export const logoutUser = createAsyncThunk('user/logoutUser', logoutApi); //выход

export const updateUser = createAsyncThunk(
  //обновление информации
  'user/updateUser',
  (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const forgotPasswoerd = createAsyncThunk(
  // Забыли пароль
  'user/forgotPasswoerd',
  (data: { email: string }) => forgotPasswordApi(data)
);

export const resetPassword = createAsyncThunk(
  //сброс пароля
  'user/resetPassword',
  (data: { password: string; token: string }) => resetPasswordApi(data)
);

export const getUser = createAsyncThunk('user/getUser', () => getUserApi());

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    checkUserStatus: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    getUserStateSelector: (state) => state,
    getUserSelector: (state) => state.user,
    isAuthorizedSelector: (state) => state.isAuthorized,
    getUserErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        // Регистрация
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.user = payload.user;
        state.isAuthorized = true;
        setCookie('accessToken', payload.accessToken);
        localStorage.setItem('  ', payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(loginUser.pending, (state) => {
        // Логин
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthorized = true;
        state.error = null;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(logoutUser.pending, (state) => {
        // Выход из аккаунта
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthorized = false;
        state.error = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(updateUser.pending, (state) => {
        // Обновление данных пользователя
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
        state.isAuthorized = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(forgotPasswoerd.pending, (state) => {
        // Забыли пароль
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPasswoerd.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPasswoerd.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(resetPassword.pending, (state) => {
        // Сброс пароля
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(getUser.pending, (state) => {
        // Получение данных пользователя
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthorized = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error';
      });
  }
});

export { initialState as userInitialState };
export const { clearUserError, checkUserStatus } = userSlice.actions;

export const {
  getUserSelector,
  getUserStateSelector,
  isAuthorizedSelector,
  getUserErrorSelector
} = userSlice.selectors;

export default userSlice.reducer;
