interface ISignUpAuth {
  email: string;
  password: string;
  username: string;
  photo: string;
  file?: string[];
}
interface IAuthToken {
  accessToken: string;
  accessTokenExpiration: number;
  refreshToken: string;
  message?: string;
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

interface ISignIn {
  password: string;
  email: string;
}

interface IPost {
  id: number;
  userId: number;
  caption: string;
  mediaUrl: string;
  mediaType: string;
  createdAt: string;
  updatedAt: string;
  user: {
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

interface IAnotherUser {
  user: {
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

interface ILikePost {
  postId: number;
  likesCount: number;
  isLike: boolean;
  likedUsers: Array<{
    username: string;
    photo: string;
    likedAt: string;
  }>;
}
