import api from "../configs/axios";

const createDocument = async (data) => {
  return api.post("/document", data);
};

const getDocuments = async (query) => {
  return api.get("/document" + "?" + query);
};

const renameDoc = async (id, data) => {
  return api.patch("/document/rename/" + id, data);
};

const deleteDoc = async (id) => {
  return api.delete("/document/" + id);
};

export { createDocument, getDocuments, renameDoc, deleteDoc };
