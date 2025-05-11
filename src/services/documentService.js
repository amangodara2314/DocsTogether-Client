import api from "../configs/axios";

const createDocument = async (data) => {
  return api.post("/document", data);
};

const getDocuments = async (query) => {
  return api.get("/document" + "?" + query);
};

export { createDocument, getDocuments };
