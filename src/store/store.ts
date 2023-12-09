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
    add: (state, action) => {
      state.push(action.payload);
    },
    edit: (state, action: PayloadAction<IBook>) => {
      const { id, ...updatedFields } = action.payload;
      const bookToUpdate = state.find((book) => book.id === id);

      if (bookToUpdate) {
        Object.assign(bookToUpdate, updatedFields);
      }
    },
  },
});

const store = configureStore({
  reducer: {
    booklist: booklist.reducer,
  },
});

export const { init, add, edit } = booklist.actions;

export type RootState = ReturnType<typeof store.getState>;

export default store;
