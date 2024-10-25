import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<AUTH.PostSignInResponse, AUTH.PostSignInRequest>({
      query: (data) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    signUp: build.mutation<AUTH.PostSignUpResponse, AUTH.PostSignUpRequest>({
      query: (data) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    getMe: build.query<AUTH.GetMeResponse, AUTH.GetMeRequest>({
      query: () => ({
        url: "/auth/user",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    forgotPassword: build.mutation<
      AUTH.ForgotPasswordResponse,
      AUTH.ForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forgot",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: build.mutation<
      AUTH.ResetPasswordResponse,
      AUTH.ResetPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: data,
      }),
    }),
    refreshToken: build.mutation<
      AUTH.RefreshTokenResponse,
      AUTH.RefreshTokenRequest
    >({
      query: (refreshToken) => ({
        url: "/auth/refresh",
        method: "PATCH",
        body: { refreshToken },
      }),
      invalidatesTags: ["auth"],
    }),
    updateProfile: build.mutation<
      AUTH.UpdateProfileResponse,
      AUTH.UpdateProfileRequest
    >({
      query: (data) => ({
        url: "/auth/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    logOut: build.mutation<AUTH.LogOutResponse, AUTH.LogOutRequest>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetMeQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useUpdateProfileMutation,
  useLogOutMutation,
} = api;
