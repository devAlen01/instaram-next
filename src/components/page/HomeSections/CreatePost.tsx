"use client";

import React, { FC } from "react";
import scss from "./CreatePost.module.scss";
import { SlClose } from "react-icons/sl";
import { useCreatePostMutation } from "@/redux/api/posts";
import { SubmitHandler, useForm } from "react-hook-form";
import { usepostStore } from "@/store/usePostStore";
import axios from "axios";

const CreatePost: FC = () => {
  const [createPostMutation] = useCreatePostMutation();
  const { register, handleSubmit, reset } = useForm<POSTS.CreatePostRequest>();
  const { isCreate, setIsCreate } = usepostStore();

  const onSubmit: SubmitHandler<POSTS.CreatePostRequest> = async (data) => {
    const selectedFile = data.file![0];
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios.post(
        "https://api.elchocrud.pro/api/v1/upload/file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const file = response.data;
      const newPost: POSTS.CreatePostRequest = {
        caption: data.caption,
        mediaType: data.mediaType,
        mediaUrl: String(file?.url),
      };
      const { data: post } = await createPostMutation(newPost);
      console.log("🚀  post:", post);
      reset();
      setIsCreate(false);
    } catch (error) {
      console.error(error);
    }
  };

  return isCreate ? (
    <section className={scss.CreatePost}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.forms}>
            <span
              className={scss.closeButton}
              onClick={() => setIsCreate(false)}
            >
              <SlClose />
            </span>
            <h3>Create post</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="file" {...register("file", { required: true })} />

              <select {...register("mediaType", { required: true })}>
                <option value="PHOTO">PHOTO</option>
                <option value="VIDEO">VIDEO</option>
              </select>
              <input
                type="text"
                placeholder="Caption..."
                required
                {...register("caption", { required: true })}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default CreatePost;
