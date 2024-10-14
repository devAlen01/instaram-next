import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<AUTH.PostSignInResponse, AUTH.PostSignInRequest>({
      query: () => ({
        url: "/auth/sign-in",
        method: "POST",
      }),
    }),
    signUp: build.mutation<AUTH.PostSignUpResponse, AUTH.PostSignUpRequest>({
      query: () => ({
        url: "/auth/sign-up",
        method: "POST",
      }),
    }),
    getMe: build.query<AUTH.GetMeResponse, AUTH.GetMeRequest>({
      query: () => ({
        url: "/auth/user",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useGetMeQuery } = api;
