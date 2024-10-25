import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getAllPosts: build.query<
      POSTS.GetAllPostsResponse,
      POSTS.GetAllPostsRequest
    >({
      query: () => ({
        url: "/post/get-all",
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    getMyPosts: build.query<POSTS.GetMyPostsResponse, POSTS.GetMyPostsRequest>({
      query: () => ({
        url: "/post/get-my",
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    deletePost: build.mutation<
      POSTS.DeletePostsResponse,
      POSTS.DeletePostsRequest
    >({
      query: (id) => ({
        url: `/post/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),
    createPost: build.mutation<
      POSTS.CreatePostResponse,
      POSTS.CreatePostRequest
    >({
      query: (data) => ({
        url: "/post/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),
    getOtherPosts: build.query<
      POSTS.GetOtherPostsResponse,
      POSTS.GetOtherPostsRequest
    >({
      query: (id) => ({
        url: `/post/get-other/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetMyPostsQuery,
  useDeletePostMutation,
  useCreatePostMutation,
  useGetOtherPostsQuery,
} = api;
