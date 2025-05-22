import instance from "./instance";

export const registerMember = async (data) => {
  return await instance.post("/member/register", data);
};

export const updateMember = async (data) => {
  return await instance.patch("/member/update", data);
};

export const getMember = async (userId) => {
  return await instance.get("/member/get", { params: { userId } });
};

export const deleteMember = async (userId, password) => {
  return await instance.delete("/member/delete", {
    params: { userId, password },
  });
};
