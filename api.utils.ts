export const baseV1Url =
  process.env.API_V1_ENDPOINT || "https://app.hotwork.ag";
export const baseUrl = process.env.API_ENDPOINT || "http://localhost:8080";
export const URL = process.env.BASE_URL || "http://localhost:3000";

export function authHeaders(token: any, formData = false) {
  const headers: object | any = {};

  if (!formData) {
    headers["Content-Type"] = "application/json";
  }

  if (typeof token === "string") {
    headers["Authorization"] = "Bearer " + token;
  }

  if (token && typeof token === "object") {
    headers["Authorization"] = "Bearer " + token.access_token;
  }

  return headers;
}

export const fetchApi = async ([url, token]: any) => {
  const res = await fetch(baseUrl + url, {
    headers: { Authorization: "Bearer " + token },
  });

  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export const fetcher = (url: any) => fetch(URL + url).then((res) => res.json());

export const msFetchApi = async ([url, token]: any) => {
  const res = await fetch("https://graph.microsoft.com/v1.0" + url, {
    headers: { Authorization: "Bearer " + token },
  });

  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};
