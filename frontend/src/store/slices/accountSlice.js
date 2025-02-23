import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedAccount: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    selectAccount: (state, action) => {
      state.selectedAccount = action.payload;
    },
  },
});

export const { selectAccount } = accountSlice.actions;
export default accountSlice.reducer;
