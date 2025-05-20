import instance from "./instance";

export const createDirectory = async (title) => {
  return await instance.post("directory/create", {
    params: { title },
  });
};
export const updateDirectory = async (directoryId, title) => {
  return await instance.patch("directory/update", {
    params: { directoryId, title },
  });
};
export const getDirectory = async (directoryId) => {
  return await instance.get("/directory/get", { params: { directoryId } });
};

export const deleteDirectory = async (directoryId) => {
  return await instance.delete("/directory/delete", {
    params: { directoryId },
  });
};

export const getDirectoryList = async (username) => {
  return await instance.get("/directory/getUserList", { params: { username } });
};
export const getMyDirectoryList = async () => {
  return await instance.get("/directory/getMyDIR");
};
