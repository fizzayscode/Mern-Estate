import api from "../api/users";

export const signUpUser = async (username, email, password) => {
  try {
    const response = await api.post("/users/sign-up", {
      username,
      email,
      password,
    });
    if (response.status !== 201) {
      throw new Error("unable to sign up");
    }
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/users/login", {
      email,
      password,
    });
    // console.log(response);
    if (response.status !== 200) {
      throw new Error("unable to sign in");
    }
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
export const googleAuth = async (email, avatar) => {
  const response = await api.post("/users/google-auth", { email, avatar });
  if (!(response.status == 200 || response.status == 201)) {
    throw new Error("Unable to authenticate ");
  }
  const data = response.data;
  console.log(data);
  return data;
};

export const logoutUser = async () => {
  const response = await api.get("/users/logout");
  if (response.status !== 200) {
    throw new Error("Unable to logout ");
  }
  const data = response.data;
  console.log(data);
  return data;
};
export const updateUser = async (id, change) => {
  const response = await api.patch(`/users/update/${id}`, change);
  if (response.status !== 200) {
    throw new Error("Unable to authenticate ");
  }
  const data = response.data;
  console.log(data);
  return data;
};

export const checkAuthStatus = async () => {
  const response = await api.get("/users/auth-status");
  if (response.status !== 200) {
    throw new Error("Unable to authenticate ");
  }
  const data = response.data;
  return data;
};

export const createListing = async (items) => {
  const response = await api.post("/users/create-listing", items);
  if (response.status !== 201) {
    throw new Error("Unable to authenticate ");
  }
  const data = response.data;
  return data;
};

export const getAllListings = async () => {
  const response = await api.get("users/get-user-listings");
  if (response.status !== 200) {
    throw new Error("Unable to authenticate ");
  }
  const data = response.data;
  return data;
};

export const deleteListing = async (listingId) => {
  const response = await api.delete(`/listing/delete-listing/${listingId}`);
  if (response.status !== 200) {
    throw new Error("Unable to authenticate ");
  }

  const data = response.data;
  return data;
};

export const getParticularListing = async (listingId) => {
  const response = await api.get(`/listing/getListing/${listingId}`);
  if (response.status !== 200) {
    throw new Error("Unable to authenticate ");
  }
  const data = response.data;
  return data;
};

export const updateParticularListing = async (listingId, items) => {
  const response = await api.patch(
    `/listing/updateListing/${listingId}`,
    items
  );
  if (response.status !== 200) {
    throw new Error("Unable to authenticate ");
  }
  const data = response.data;
  return data;
};

export const getParticularUser = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  if (response.status !== 200) {
    throw new Error("Unable to authenticate ");
  }
  const data = response.data;
  return data;
};

export const searchListings = async (searchQuery) => {
  const response = await api.get(`/listing/get?${searchQuery}`);
  if (response.status !== 200) {
    throw new Error("Unable to authenticate ");
  }
  const data = response.data;
  return data;
};
