export const getHeaders = (method, data, isFormData = false) => {
  const currentUser = localStorage.getItem("currentUser");
  const contentType = isFormData
    ? { "Content-Type": "multipart/form-data" }
    : { "Content-Type": "application/json" };

  if (currentUser) {
    const tokens = {
      "access-token": currentUser["access-token"],
      client: currentUser.client,
      uid: currentUser.uid,
    };

    return {
      method,
      data,
      headers: {
        ...tokens,
        ...contentType,
      },
    };
  } else {
    return {
      method,
      data,
      headers: { ...contentType },
    };
  }
};
