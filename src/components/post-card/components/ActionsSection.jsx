import { useDispatch } from "react-redux";
import { updateLikeAction } from "../../../store/reducers/usersReducer";
import { useState } from "react";

function ActionsSection({ postData, emitFocus }) {
  const [focus, setFocus] = useState(null);

  const dispatch = useDispatch();

  const onClickLike = (payload) => {
    dispatch(updateLikeAction(payload));
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
      {/* ACTIONS SECTION (LIKE / COMMENT) */}
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
