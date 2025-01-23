import { authHeaders, baseUrl } from "@/api.utils";

export const getApiSelectValue = async (params: any, access_token: any) => {
  const queryString = new URLSearchParams(params).toString();

  const res = await fetch(
    `${baseUrl}/api/select/getDefaultValues?${queryString}`,
    { headers: authHeaders(access_token) }
  );
  const json = await res.json();

  return json;
};

export const getListUtilies = async () => {
  const res = await fetch(baseUrl + "/list_utilities");
  const json = await res.json();
  return json;
};
