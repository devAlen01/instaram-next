"use client";

import React, { FC, useEffect, useState } from "react";
import scss from "./Posts.module.scss";
import { useGetAllPostsQuery } from "@/redux/api/posts";
import { MdOutlineModeComment } from "react-icons/md";
import { PiTelegramLogo } from "react-icons/pi";
import { LuBookmark } from "react-icons/lu";
import { CgMoreO } from "react-icons/cg";

import PostLikes from "./PostLikes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import OtherPost from "./OtherPost";
import { usepostStore } from "@/store/usePostStore";
import { useGetMeQuery } from "@/redux/api/auth";

function formatTimeAgo(createdAt: string): string {
  const postDate = new Date(createdAt);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (years > 0) {
    return `${years} y`;
  } else if (months > 0) {
    return `${months} month`;
  } else if (days > 0) {
    return `${days} day`;
  } else if (hours > 0) {
    return `${hours} h`;
  } else if (minutes > 0) {
    return `${minutes} min`;
  } else {
    return "now";
  }
}

const Posts: FC = () => {
  const { data, isLoading } = useGetAllPostsQuery();
  const { data: me } = useGetMeQuery();
  const router = useRouter();
  const { setOtherPost } = usepostStore();
  const [words, setWords] = useState<boolean>(true);

  useEffect(() => {
    const tokensString = localStorage.getItem("tokens");
    if (!tokensString) {
      router.push("/auth/sign-in");
      return;
    }
  }, [isLoading]);

  if (isLoading) return null;

  return (
    <section className={scss.Posts}>
      <div className="container">
        <div className={scss.content}>
          {data?.map((item) => (
            <div className={scss.post} key={item.id}>
              <div className={scss.user}>
                <div className={scss.userProfile}>
                  <img src={item.user.photo} alt="profile" />
                </div>
                <div
                  className={scss.userName}
                  onClick={() =>
                    router.push(
                      item.userId !== me?.profile.id
                        ? `/profile/${item.userId}`
                        : "/profile"
                    )
                  }
                >
                  <div className={scss.info}>
                    <span className={scss.name}>{item.user.username}</span>
                    &#183;
                    <span className={scss.date}>
                      {formatTimeAgo(item.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
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
                  <video src={item.mediaUrl} controls />
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
                <p
                  onClick={() => setWords(!words)}
                  className={words ? scss.caption : ""}
                >
                  {item.caption}
                </p>
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
