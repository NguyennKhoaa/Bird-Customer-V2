import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { accountReducer } from '../Login/account.slice';
// import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    accounts: accountReducer,
  },
  middleware: getDefaultMiddleware => (process.env.NODE_ENV === 'development' ? getDefaultMiddleware().concat() : getDefaultMiddleware())
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
