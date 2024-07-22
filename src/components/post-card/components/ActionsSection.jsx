import { useDispatch, useSelector } from "react-redux";
import { updateLikeAction } from "../../../store/reducers/usersReducer";
import { useState } from "react";
import { useUserAndPost } from "../../../helpers/useUserAndPost";

function ActionsSection({ postData, emitFocus }) {
  const usersInfo = useSelector((state) => state.users.users);

  const [focus, setFocus] = useState(null);

  const dispatch = useDispatch();

  const onClickLike = (payload) => {
    const { userIndex, postIndex } = useUserAndPost(usersInfo, payload);

    if (userIndex !== null && postIndex !== null) {
      dispatch(updateLikeAction({ userIndex, postIndex, ...payload }));
    }
  };

  const focusOnInput = () => {
    if (focus === null) {
      setFocus(() => true);
    } else {
      setFocus(() => !focus);
    }
    emitFocus(focus);
  };

  return (
    <>
      <div className="likes cat-flex cat-items-center">
        <cat-button
          icon="thumbs-up-outlined"
          variant="text"
          color={postData.liked ? "primary" : ""}
          data-testid={"like-button" + postData.postId}
          onClick={() => onClickLike(postData)}
        >
          {postData.liked ? "Liked" : "Like"}
        </cat-button>
        <cat-button
          icon="comment-outlined"
          variant="text"
          data-testid={"comment-btn-focus" + postData.postId}
          onClick={focusOnInput}
        >
          Comment
        </cat-button>
      </div>
    </>
  );
}

export default ActionsSection;
