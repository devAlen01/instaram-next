"use client";
import React, { FC, useEffect, useState } from "react";
import scss from "./Profile.module.scss";
import { useGetMeQuery, useLogOutMutation } from "@/redux/api/auth";
import { useDeletePostMutation, useGetMyPostsQuery } from "@/redux/api/posts";
import EditProfileForm from "./EditProfileForm";
import { SlClose } from "react-icons/sl";
import { useRouter } from "next/navigation";
import Loading from "@/ui/Loading/Loading";
import Image from "next/image";

const Profile: FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { data, isLoading: isLoadMe } = useGetMeQuery();
  const { data: posts, isLoading: isLoadPost } = useGetMyPostsQuery();
  const [deletePostMutation] = useDeletePostMutation();
  const [logOutMutation] = useLogOutMutation();
  const router = useRouter();

  const handleLogOut = async () => {
    const res = await logOutMutation();
    console.log("🚀", res);
    localStorage.removeItem("tokens");
    router.push("/auth/sign-in");
  };

  useEffect(() => {
    if (!data?.profile?.isActive) {
      router.push("/auth/sign-in");
    }
  }, []);

  if (isLoadPost && isLoadPost) return <Loading />;

  return (
    <section className={scss.Profile}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.profile}>
            <div className={scss.left}>
              <div className={scss.image}>
                <Image
                  width={180}
                  height={180}
                  priority
                  src={data?.profile.photo!}
                  alt={data?.profile.username!}
                />
              </div>
            </div>
            <div className={scss.right}>
              <div className={scss.userData}>
                <h3>{data?.profile.username}</h3>
                <div className={scss.btns}>
                  <button onClick={() => setIsEdit(true)}>Edit profile</button>
                  <button>View archive</button>
                  <button onClick={handleLogOut}>Log out</button>
                </div>
              </div>
              <div className={scss.folowers}>
                <p>
                  <span className={scss.totalCount}>{posts?.length} </span>{" "}
                  posts
                </p>
                <p>
                  <span className={scss.totalCount}>232 </span>folowers
                </p>
                <p>
                  <span className={scss.totalCount}>434 </span>folowing
                </p>
              </div>
              <div className={scss.description}>
                <h5>{data?.profile.username}</h5>
                <p>
                  Qui hic necessitatibus esse aut ullam eveniet rerum voluptatum
                  consectetur eaque? Itaque saepe natus tempore iusto laboriosam
                </p>
              </div>
            </div>
          </div>
          <div className={scss.line}></div>
          <div className={scss.posts}>
            {posts?.map((item) => (
              <div className={scss.post} key={item.id}>
                <span
                  className={scss.deleteIcon}
                  onClick={() => deletePostMutation(item.id)}
                >
                  <SlClose />
                </span>
                <div className={scss.image}>
                  {item.mediaType === "PHOTO" ? (
                    <img src={item.mediaUrl} alt="post" />
                  ) : (
                    <video src={item.mediaUrl} controls></video>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <EditProfileForm
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          photo={data?.profile?.photo!}
          username={data?.profile?.username!}
        />
      </div>
    </section>
  );
};

export default Profile;
