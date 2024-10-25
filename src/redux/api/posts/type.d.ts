namespace POSTS {
  type GetAllPostsResponse = IPost[];
  type GetAllPostsRequest = void;

  type GetMyPostsResponse = IPost[];
  type GetMyPostsRequest = void;

  type DeletePostsResponse = string;
  type DeletePostsRequest = number;

  type CreatePostResponse = IPost;
  type CreatePostRequest = {
    caption: string;
    mediaUrl: string;
    mediaType: string;
    file?: string[];
  };

  type GetOtherPostsResponse = IPost[];
  type GetOtherPostsRequest = number;
}
