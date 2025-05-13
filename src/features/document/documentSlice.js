import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  documents: null,
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setDocuments: (state, action) => {
      state.documents = action.payload.documents;
    },

    renameDocument: (state, action) => {
      state.documents = state.documents.map((doc) => {
        if (doc.id === action.payload.id) {
          return { ...doc, title: action.payload.name };
        }
        return doc;
      });
    },
    deleteDocument: (state, action) => {
      state.documents = state.documents.filter(
        (doc) => doc.id !== action.payload.id
      );
    },
  },
});

export default documentSlice.reducer;
export const { setDocuments, renameDocument, deleteDocument } =
  documentSlice.actions;
