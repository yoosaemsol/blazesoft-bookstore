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
      saveState(state);
    },
    edit: (state, action: PayloadAction<IBook>) => {
      const { id, ...updatedFields } = action.payload;
      const bookToUpdate = state.find((book: IBook) => book.id === id);

      if (bookToUpdate) {
        Object.assign(bookToUpdate, updatedFields);
        saveState(state);
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      const newState = state.filter(
        (book: IBook) => book.id !== action.payload
      );
      saveState(newState);
      return newState;
    },
  },
});

const store = configureStore({
  reducer: {
    booklist: booklist.reducer,
  },
});

export const { init, add, edit, remove } = booklist.actions;

export type RootState = ReturnType<typeof store.getState>;

export default store;

export function loadState() {
  try {
    const serializedState = localStorage.getItem('booklist_state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return undefined;
  }
}

function saveState(state: IBook[]) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('booklist_state', serializedState);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
}
