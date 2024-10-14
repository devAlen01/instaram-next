namespace AUTH {
  type PostSignInResponse = IAuthToken;
  type PostSignInRequest = {
    email: string;
    password: string;
  };

  type PostSignUpResponse = IAuthToken;
  type PostSignUpRequest = ISignUpAuth;

  type GetMeResponse = IUserAuth;
  type GetMeRequest = void;
}
