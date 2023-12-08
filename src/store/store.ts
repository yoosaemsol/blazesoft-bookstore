import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IBook {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  coverURL?: string;
}

const booklist = createSlice({
  name: 'booklist',
  initialState: [] as IBook[],
  reducers: {
    init: (state, action: PayloadAction<IBook[]>) => {
      return action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    booklist: booklist.reducer,
  },
});

export const { init } = booklist.actions;

export type RootState = ReturnType<typeof store.getState>;

export default store;
