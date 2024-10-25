import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  prepareHeaders: (headers) => {
    const tokensString = localStorage.getItem("tokens");
    let tokens;
    try {
      if (tokensString) {
        tokens = JSON.parse(tokensString);
      }
    } catch (error) {
      console.error("Failed to parse tokens:", error);
    }
    if (tokens && tokens.accessToken) {
      headers.set("Authorization", `Bearer ${tokens.accessToken}`);
    }
    return headers;
  },
});

const baseQuerExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuerExtended,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
  tagTypes: ["auth", "post", "like"],
});
