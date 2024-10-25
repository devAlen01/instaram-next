"use client";

import React, { FC, useEffect, useState } from "react";
import scss from "./Posts.module.scss";
import { useGetAllPostsQuery } from "@/redux/api/posts";
import { MdOutlineModeComment } from "react-icons/md";
import { PiTelegramLogo } from "react-icons/pi";
import { LuBookmark } from "react-icons/lu";
import { CgMoreO } from "react-icons/cg";

import PostLikes from "./PostLikes";
import { useGetMeQuery } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import OtherPost from "./OtherPost";
import { usepostStore } from "@/store/usePostStore";

const Posts: FC = () => {
  const { data, isLoading } = useGetAllPostsQuery();
  const { data: user, isLoading: userIsLoading } = useGetMeQuery();
  const router = useRouter();
  const { setOtherPost } = usepostStore();

  useEffect(() => {
    setTimeout(() => {
      if (!user?.profile?.isActive) {
        router.push("/auth/sign-in");
      }
    }, 1200);
  }, [user]);

  if (isLoading && userIsLoading) return null;

  return (
    <section className={scss.Posts}>
      <div className="container">
        <div className={scss.content}>
          {data?.map((item) => (
            <div className={scss.post} key={item.id}>
              <div className={scss.image}>
                {item.mediaType === "PHOTO" ? (
                  <Image
                    width={470}
                    height={400}
                    priority
                    src={item?.mediaUrl}
                    alt="post"
                  />
                ) : (
                  <video controls>
                    <source src={item.mediaUrl} type="video/mp4" />
                  </video>
                )}
                <div className={scss.iconMore}>
                  <div
                    className={scss.icon}
                    onClick={() => setOtherPost(item.userId)}
                  >
                    <CgMoreO />
                  </div>
                </div>
              </div>

              <div className={scss.icons}>
                <div className={scss.left}>
                  <span className={scss.icon}>
                    <PostLikes postId={item.id} />
                  </span>
                  <span className={scss.icon}>
                    <MdOutlineModeComment />
                  </span>
                  <span className={scss.icon}>
                    <PiTelegramLogo />
                  </span>
                </div>
                <div className={scss.right}>
                  <span className={scss.icon}>
                    <LuBookmark />
                  </span>
                </div>
              </div>
              <div className={scss.likesCount}>
                <PostLikes postId={item.id} count={true} />
              </div>
              <div className={scss.contentText}>
                <p>{item.caption}</p>
              </div>
              <div className={scss.line}></div>
            </div>
          ))}
        </div>
        <OtherPost />
      </div>
    </section>
  );
};

export default Posts;
