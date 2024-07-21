import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../../store/reducers/usersReducer";

function AddCommentSection({ postData, focusInput }) {
  const inputRef = useRef(null);

  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const onComment = (event) => {
    setComment(() => event.target.value.trim());
  };

  const onCommentSubmit = () => {
    dispatch(addComment({ ...postData, comment: comment }));
    setComment("");
  };

  useEffect(() => {
    if (inputRef.current && focusInput !== null) {
      inputRef.current.doFocus();
    }
  }, [focusInput]);

  return (
    <>
      <div className="cat-flex cat-items-center cat-mb-l">
        <cat-input
          ref={inputRef}
          placeholder="Write a comment..."
          class="input-comment"
          value={comment}
          data-testid={"comment-input" + postData.postId}
          onInput={onComment}
        ></cat-input>
        <div className="cat-mt-s cat-ml-xs">
          <cat-button
            icon-right="true"
            icon="arrow-right-outlined"
            submit="true"
            variant="filled"
            data-testid={"send-comment-btn" + postData.postId}
            disabled={!comment.length}
            onClick={onCommentSubmit}
          >
            Comment
          </cat-button>
        </div>
      </div>
    </>
  );
}

export default AddCommentSection;
