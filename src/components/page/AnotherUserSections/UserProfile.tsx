"use client";

import React, { FC } from "react";
import scss from "./UserProfile.module.scss";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGetOtherPostsQuery } from "@/redux/api/posts";
import Loading from "@/ui/Loading/Loading";
import Zoom from "react-medium-image-zoom";

const UserProfile: FC = () => {
  const { userId } = useParams();
  const { data, isLoading } = useGetOtherPostsQuery(+userId);
  if (isLoading) return <Loading />;
  return (
    <section className={scss.UserProfile}>
      <div className="container">
        {data && data.length > 0 && data[0].user && (
          <div className={scss.content}>
            <div className={scss.profile}>
              <div className={scss.left}>
                <div className={scss.image}>
                  <Image
                    width={180}
                    height={180}
                    priority
                    src={data[0]?.user?.photo!}
                    alt={data[0]?.user?.username!}
                  />
                </div>
              </div>
              <div className={scss.right}>
                <div className={scss.userData}>
                  <h3>{data[0]?.user?.username}</h3>
                  <div className={scss.btns}>
                    <button>Following</button>
                    <button>Message</button>
                    <button className={scss.options}>
                      &#xb7; &#xb7; &#xb7;
                    </button>
                  </div>
                </div>
                <div className={scss.folowers}>
                  <p>
                    <span className={scss.totalCount}>{data?.length} </span>{" "}
                    posts
                  </p>
                  <p>
                    <span className={scss.totalCount}>1200 </span>folowers
                  </p>
                  <p>
                    <span className={scss.totalCount}>434 </span>folowing
                  </p>
                </div>
                <div className={scss.description}>
                  <h5>{data[0]?.user?.username}</h5>
                  <p>
                    Qui hic necessitatibus esse aut ullam eveniet rerum
                    voluptatum consectetur eaque? Itaque saepe natus tempore
                    iusto laboriosam
                  </p>
                </div>
              </div>
            </div>
            <div className={scss.line}></div>
            <div className={scss.posts}>
              {data?.map((item) => (
                <div className={scss.post} key={item.id}>
                  <div className={scss.image}>
                    {item.mediaType === "PHOTO" ? (
                      <Zoom>
                        <img src={item.mediaUrl} alt="post" />
                      </Zoom>
                    ) : (
                      <video src={item.mediaUrl} controls></video>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserProfile;
