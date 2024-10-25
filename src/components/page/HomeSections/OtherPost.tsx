import React, { FC, useEffect } from "react";
import scss from "./OtherPost.module.scss";
import { useGetOtherPostsQuery } from "@/redux/api/posts";
import Loading from "@/ui/Loading/Loading";
import { SlClose } from "react-icons/sl";
import { usepostStore } from "@/store/usePostStore";

const OtherPost: FC = () => {
  const { otherPost, setOtherPost } = usepostStore();
  const { data, isLoading } = useGetOtherPostsQuery(+otherPost!);

  if (isLoading) return <Loading />;
  return (
    otherPost && (
      <section className={scss.OtherPost}>
        <div className="container">
          <div className={scss.content}>
            <span
              className={scss.closeButton}
              onClick={() => setOtherPost(null)}
            >
              <SlClose />
            </span>
            <div className={scss.posts}>
              {data?.map((item) => (
                <div className={scss.post} key={item.id}>
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
        </div>
      </section>
    )
  );
};

export default OtherPost;
