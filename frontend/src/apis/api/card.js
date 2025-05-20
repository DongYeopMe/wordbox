import instance from "./instance";

export const createCard = async (data) => {
  return await instance.post("/card/create", data);
};

export const updateCard = async (id, data) => {
  return await instance.patch(`/card/update/${id}`, data);
};

export const getCard = async (data) => {
  return await instance.get("/card/get", data);
};

export const deleteCard = async (cardId) => {
  return await instance.delete("/card/delete", { params: { cardId } });
};

export const getWordList = async (cardId) => {
  return await instance.get("/card/getWordList", { params: { cardId } });
};
export const getMyCards = async () => {
  return await instance.get("/card/getMyCards");
};
