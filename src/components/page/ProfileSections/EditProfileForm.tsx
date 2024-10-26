"use client";

import React, { FC } from "react";
import scss from "./EditProfileForm.module.scss";
import { useUpdateProfileMutation } from "@/redux/api/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { SlClose } from "react-icons/sl";
import { useUploadMediaFileMutation } from "@/redux/api/upload";
interface IUpdateProps {
  username: string;
  photo: string;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
}
const EditProfileForm: FC<IUpdateProps> = ({
  photo,
  username,
  setIsEdit,
  isEdit,
}) => {
  const { register, handleSubmit, reset } =
    useForm<AUTH.UpdateProfileRequest>();
  const [updateProfileMutation] = useUpdateProfileMutation();
  const [uploadMediaFileMutation] = useUploadMediaFileMutation();

  const handleUpdate: SubmitHandler<AUTH.UpdateProfileRequest> = async (
    data
  ) => {
    const selectedFile = data.file![0];
    const formData = new FormData();
    formData.append("file", selectedFile);
    const { data: file } = await uploadMediaFileMutation(formData);
    const newData: AUTH.UpdateProfileRequest = {
      photo: String(file?.url),
      username: data.username,
    };
    try {
      const { data: res } = await updateProfileMutation(newData);
      console.log("Update Success:", res);
      reset();
      setIsEdit(false);
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return isEdit ? (
    <section className={scss.EditProfileForm}>
      <div className={scss.content}>
        <div className={scss.forms}>
          <span className={scss.closeButton} onClick={() => setIsEdit(false)}>
            <SlClose />
          </span>
          <h3>Edit profile</h3>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <input
              defaultValue={username}
              type="text"
              placeholder="New User name"
              {...register("username", { required: true })}
              required
            />
            <input
              type="file"
              {...register("file", { required: true })}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  ) : null;
};

export default EditProfileForm;
