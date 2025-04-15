import { cookies } from "next/headers";

export const storeToken = async (token, type) => {
  const cookieStore = await cookies();
  cookieStore.set(type + "Token", token);
};

export const getToken = async (type) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(type + "Token");
  if (token) {
    return token.value;
  }
  return null;
};

export const removeTokens = async () => {
  const cookieStore = await cookies();
  cookieStore.remove("accessToken");
  cookieStore.remove("refreshToken");
  removeUserDetails();
};

export const isAuthenticated = async () => {
  return !!(await getAccessToken());
};

export const getAccessToken = async () => {
  return await getToken("access");
};

export const getRefreshToken = async () => {
  return await getToken("refresh");
};

export const storeAccessToken = async (token) => {
  await storeToken(token, "access");
};

export const storeRefreshToken = async (token) => {
  await storeToken(token, "refresh");
};

export const setUserDetails = async (user) => {
  const cookieStore = await cookies();
  cookieStore.set("userDetails", JSON.stringify(user));
};

export const getUserDetails = async () => {
  const cookieStore = await cookies();
  const userDetails = cookieStore.get("userDetails");
  if (userDetails) {
    return JSON.parse(userDetails.value);
  }
  return null;
};

export const removeUserDetails = async () => {
  const cookieStore = await cookies();
  cookieStore.remove("userDetails");
};

export const isStaff = async () => {
  const user = await getUserDetails();
  return user && user.is_staff;
};

export const handleLoginSuccess = async (res) => {
  await storeAccessToken(res.data.access);
  await storeRefreshToken(res.data.refresh);
  await setUserDetails(res.data.user);
};
