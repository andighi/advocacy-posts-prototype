import Comment from "./components/Comment";
import AddCommentSection from "./components/AddCommentSection";
import ActionsSection from "./components/ActionsSection";
import { useState } from "react";
import LikedBySection from "./components/LikedBySection";
import HeaderSection from "./components/HeaderSection";

function PostCard({ userId, name, avatar, post }) {
  const [focus, setFocus] = useState(null);

  const focusOnInput = (value) => {
    if (value === null) {
      setFocus(() => true);
    } else {
      setFocus(() => !focus);
    }
  };

  const hasParams = () => {
    return (
      post.postId &&
      post.title &&
      post.text &&
      post.postedAt &&
      post.image &&
      post.likedBy &&
      post.comments &&
      post.liked !== undefined
    );
  };

  return (
    <>
      {hasParams() && (
        <cat-card
          class={"cat-mb-l cat-p-l post-card"}
          data-testid={"post-card" + post.postId}
        >
          <HeaderSection
            user={{ id: userId, name: name, avatar: avatar }}
            post={post}
          />

          <div className="cat-hr cat-mv-m"></div>

          <div>
            <div className="content">
              <h2>{post.title}</h2>
              <p className="cat-mt-m">{post.text}</p>
            </div>
            <div className="cat-pt-m cat-pb-m">
              <img
                src={post.image}
                className="post-image cat-radius-m"
                width={"100%"}
                alt="Picture should be here"
              ></img>
            </div>
          </div>

          <ActionsSection
            postData={{
              userId: userId,
              postId: post.postId,
              liked: post.liked,
            }}
            emitFocus={focusOnInput}
          />
          <div className="cat-hr cat-mv-m"></div>

          {<LikedBySection post={post} />}

          <div className="cat-hr cat-mv-m"></div>

          <AddCommentSection
            postData={{ userId: userId, postId: post.postId }}
            focusInput={focus}
          />

          {!post.comments.length && (
            <div data-testid="no-comments-yet" className="no-comments-yet">
              No comments yet.
            </div>
          )}
          <div className="comment-section">
            {post.comments &&
              post.comments.map((comment) => (
                <Comment comment={comment} key={comment.id} />
              ))}
          </div>
        </cat-card>
      )}

      {!hasParams() && (
        <cat-card class={"cat-mb-l cat-p-l"}>
          Oops... Something went wrong. Post could not be loaded.
        </cat-card>
      )}
    </>
  );
}

export default PostCard;
