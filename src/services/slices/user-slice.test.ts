import userReducer, {
    loginUser,
    registerUser,
    logoutUser,
    updateUser,
    forgotPasswoerd,
    resetPassword,
    getUser, 
    initialState
  } from './user-slice';
  
  describe('UserSlice', () => {
    it('возвращаем начальное состояние', () => {
      const state = userReducer(undefined, { type: '' });
      expect(state).toEqual(initialState);
    });
  
    it('обработка registerUser.pending', () => {
      const action = { type: registerUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  
    it('обработка registerUser.fulfilled', () => {
      const user = { id: 'user123', email: 'test@test.com' };
      const action = {
        type: registerUser.fulfilled.type,
        payload: {
          user,
          accessToken: 'access-token',
          refreshToken: 'refresh-token'
        }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        user,
        isAuthorized: true,
        isLoading: false,
        error: null
      });
    });
  
    it('обработка registerUser.rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: 'Ошибка',
        isAuthorized: false,
        isLoading: false
      });
    });
  
    it('обработка loginUser.pending', () => {
      const action = { type: loginUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  
    it('обработка loginUser.fulfilled', () => {
      const user = { id: 'user123', email: 'test@test.com' };
      const action = {
        type: loginUser.fulfilled.type,
        payload: {
          user,
          accessToken: 'access-token',
          refreshToken: 'refresh-token'
        }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        user,
        isAuthorized: true,
        isLoading: false,
        error: null
      });
    });
  
    it('обработка loginUser.rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: 'Ошибка',
        isAuthorized: false,
        isLoading: false
      });
    });
  
    it('обработка logoutUser.pending', () => {
      const action = { type: logoutUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  
    it('обработка logoutUser.fulfilled', () => {
      const action = { type: logoutUser.fulfilled.type };
      const state = userReducer(
        {
          ...initialState,
          user: { email: 'test@test.com', name: '' },
          isAuthorized: true
        },
        action
      );
      expect(state).toEqual({
        ...initialState,
        user: null,
        isAuthorized: false,
        isLoading: false,
        error: null
      });
    });
  
    it('обработка logoutUser.rejected', () => {
      const action = {
        type: logoutUser.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: 'Ошибка',
        isAuthorized: false,
        isLoading: false
      });
    });
  
    it('обработка updateUser.pending', () => {
      const action = { type: updateUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  
    it('обработка updateUser.fulfilled', () => {
      const user = { id: 'user123', email: 'updated@test.com' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        user,
        isAuthorized: true,
        isLoading: false,
        error: null
      });
    });
  
    it('обработка updateUser.rejected', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: 'Ошибка',
        isAuthorized: false,
        isLoading: false
      });
    });
  
    it('обработка forgotPasswoerd.pending', () => {
      const action = { type: forgotPasswoerd.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  
    it('обработка forgotPasswoerd.fulfilled', () => {
      const action = { type: forgotPasswoerd.fulfilled.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: null
      });
    });
  
    it('обработка forgotPasswoerd.rejected', () => {
      const action = {
        type: forgotPasswoerd.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: 'Ошибка',
        isLoading: false
      });
    });
  
    it('обработка resetPassword.pending', () => {
      const action = { type: resetPassword.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  
    it('обработка resetPassword.fulfilled', () => {
      const action = { type: resetPassword.fulfilled.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: null
      });
    });
  
    it('обработка resetPassword.rejected', () => {
      const action = {
        type: resetPassword.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: 'Ошибка',
        isLoading: false
      });
    });
  
    it('обработка getUser.pending', () => {
      const action = { type: getUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  
    it('обработка getUser.fulfilled', () => {
      const user = { id: 'user123', email: 'test@test.com' };
      const action = {
        type: getUser.fulfilled.type,
        payload: { user }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        user,
        isAuthorized: true,
        isLoading: false,
        error: null
      });
    });
  
    it('обработка getUser.rejected', () => {
      const action = {
        type: getUser.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: 'Ошибка',
        isAuthorized: false,
        isLoading: false
      });
    });
  });