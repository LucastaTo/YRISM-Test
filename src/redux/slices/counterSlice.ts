import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  loading: boolean;
  error: string | null; 
}

const initialState: CounterState = {
  value: 0,
  loading: false,
  error: null,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment() {
    },
    incrementAsync(state) {
      state.loading = true;
      state.error = null;
    },
    incrementAsyncSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      state.value += action.payload;
    },
    incrementAsyncFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { increment, incrementAsync, incrementAsyncSuccess, incrementAsyncFailure } = counterSlice.actions;
export default counterSlice.reducer;
