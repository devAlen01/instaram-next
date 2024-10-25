import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    uploadMediaFile: build.mutation<
      UPLOAD.UploadMediaFileResponse,
      UPLOAD.UploadMediaFileRequest
    >({
      query: (data) => ({
        url: "/upload/file",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadMediaFileMutation } = api;
