interface ISignUpAuth {
  email: string;
  password: string;
  username: string;
  photo: string;
}

interface IAuthToken {
  accessToken: string;
  accessTokenExpiration: number;
  refreshToken: string;
}

interface IUserAuth {
  profile: {
    id: number;
    username: string;
    role: string;
    email: string;
    isActive: boolean;
    photo: string;
    createdAt: string;
    updatedAt: string;
  };
}
