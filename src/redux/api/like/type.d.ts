namespace LIKE {
  type GetQuantityLikesResponse = ILikePost;
  type GetQuantityLikesRequest = number;
  type PostLikeResponse = {
    userId: number;
    postId: number;
    createdAt: string;
    updatedAt: string;
  };

  type PostLikeRequest = number;

  type DeleteLikeResponse = {
    userId: number;
    postId: number;
  };
  type DeleteLikeRequest = number;
}
