import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  documents: null,
  document: null,
  role: "VIEWER",
  presence: [],
  leftMargin: 0,
  rightMargin: 0,
  content: null,
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

    setDocument: (state, action) => {
      state.document = action.payload.document;
      state.role = action.payload.role;
      state.leftMargin = action.payload.leftMargin;
      state.rightMargin = action.payload.rightMargin;
      state.content = action.payload.content;
    },

    updatePresence: (state, action) => {
      state.presence = action.payload.presence;
    },

    setLeftMargin: (state, action) => {
      state.leftMargin = action.payload;
    },
    setRightMargin: (state, action) => {
      state.rightMargin = action.payload;
    },
  },
});

export default documentSlice.reducer;
export const {
  setDocuments,
  renameDocument,
  deleteDocument,
  setDocument,
  updatePresence,
  setLeftMargin,
  setRightMargin,
} = documentSlice.actions;
