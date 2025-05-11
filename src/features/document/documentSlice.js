import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  documents: null,
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setDocument: (state, action) => {
      state.documents = action.payload.documents;
    },
  },
});

export default documentSlice.reducer;
export const { setDocument } = documentSlice.actions;
