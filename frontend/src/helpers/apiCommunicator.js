import api from "../api/users";

export const signUpUser = async (username, email, password) => {
  try {
    const response = await api.post("/users/sign-up", {
      username,
      email,
      password,
    });
    console.log(response);
    if (response.status !== 201) {
      throw new Error("unable to sign up");
    }
    return response.data;
  } catch (e) {
    console.log(e);
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

export const checkAuthStatus = async () => {
  const response = await api.get("/users/auth-status");
  if (response.status !== 200) {
    throw new Error("Unable to authenticate ");
  }
  const data = response.data;
  console.log(data);
  return data;
};
