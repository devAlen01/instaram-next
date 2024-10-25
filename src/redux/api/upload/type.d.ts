namespace UPLOAD {
  type UploadMediaFileRequest = FormData;
  type UploadMediaFileResponse = {
    name: string;
    format: string;
    url: string;
  };
}
