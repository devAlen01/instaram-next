import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getQuantityLikes: build.query<
      LIKE.GetQuantityLikesResponse,
      LIKE.GetQuantityLikesRequest
    >({
      query: (postId) => ({
        url: `/post/get-like/${postId}`,
        method: "GET",
      }),
      providesTags: ["like"],
    }),
    postLike: build.mutation<
      LIKE.PostLikeResponse,
      LIKE.GetQuantityLikesRequest
    >({
      query: (postId) => ({
        url: "/post/like",
        method: "POST",
        body: { postId },
      }),
      invalidatesTags: ["like"],
    }),
    unLikePost: build.mutation<LIKE.DeleteLikeResponse, LIKE.DeleteLikeRequest>(
      {
        query: (postId) => ({
          url: `/post/unlike`,
          method: "DELETE",
          body: { postId },
        }),
        invalidatesTags: ["like"],
      }
    ),
  }),
});

export const {
  useGetQuantityLikesQuery,
  usePostLikeMutation,
  useUnLikePostMutation,
} = api;
