namespace AUTH {
  type PostSignInResponse = IAuthToken;
  type PostSignInRequest = ISignIn;

  type PostSignUpResponse = IAuthToken;
  type PostSignUpRequest = ISignUpAuth;

  type GetMeResponse = IUserAuth;
  type GetMeRequest = void;

  type ForgotPasswordRequest = {
    email: string;
    frontEndUrl: string;
  };
  type ForgotPasswordResponse = {
    message: string;
  };

  type ResetPasswordResponse = string;
  type ResetPasswordRequest = {
    token: string;
    newPassword: string;
  };

  type RefreshTokenResponse = IAuthToken;
  type RefreshTokenRequest = string;

  type UpdateProfileResponse = string;
  type UpdateProfileRequest = {
    username: string;
    photo: string;
  };

  type LogOutResponse = string;
  type LogOutRequest = void;
}
