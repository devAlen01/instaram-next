import {
  useGetQuantityLikesQuery,
  useUnLikePostMutation,
} from "@/redux/api/like";
import { PiHeartFill } from "react-icons/pi";
import { usePostLikeMutation } from "@/redux/api/like";

const PostLikes = ({ postId, count }: { postId: number; count?: boolean }) => {
  const { data: likes } = useGetQuantityLikesQuery(postId);
  const [postLikeMutation] = usePostLikeMutation();
  const [unLikePostMutation] = useUnLikePostMutation();
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
    <div>{likes?.likesCount} likes</div>
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
