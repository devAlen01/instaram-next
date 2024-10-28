"use client";
import scss from "./PostLikes.module.scss";
import {
  useGetQuantityLikesQuery,
  useUnLikePostMutation,
} from "@/redux/api/like";
import { PiHeartFill } from "react-icons/pi";
import { usePostLikeMutation } from "@/redux/api/like";
import { useState } from "react";

const PostLikes = ({ postId, count }: { postId: number; count?: boolean }) => {
  const { data: likes } = useGetQuantityLikesQuery(postId);
  const [postLikeMutation] = usePostLikeMutation();
  const [unLikePostMutation] = useUnLikePostMutation();
  const [likedUsers, setLikedUsers] = useState<boolean>(false);
  const postLike = async (postId: number) => {
    try {
      if (likes?.isLike) {
        await unLikePostMutation(postId);
      } else {
        await postLikeMutation(postId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return count ? (
    <div className={scss.like}>
      <div
        className={scss.likeCount}
        onClick={() => setLikedUsers(!likedUsers)}
      >
        {likes?.likesCount} likes
      </div>

      {likedUsers ? (
        <div className={scss.likedUsers}>
          {likes?.likedUsers.map((item, index) => (
            <div className={scss.user} key={index}>
              <div className={scss.userProfile}>
                <img src={item.photo} alt="photo" />
              </div>
              <span className={scss.userName}>{item.username}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  ) : (
    <div
      onClick={() => postLike(postId)}
      style={{ color: likes?.isLike ? " red" : "" }}
    >
      <PiHeartFill />
    </div>
  );
};

export default PostLikes;
