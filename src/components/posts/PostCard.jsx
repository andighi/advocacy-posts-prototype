import Comment from "./Comment";
import AddCommentSection from "./AddCommentSection";
import ActionsSection from "./ActionsSection";
import { useState } from "react";
import { Link } from "react-router-dom";

function PostCard({ id, name, avatar, post }) {
  const [focus, setFocus] = useState(null);

  const likedByList = () => {
    const filteredPeople = post.likedBy.reduce((acc, curr, i, self) => {
      if (i < 4) {
        acc.push(curr);
      } else if (!acc.includes("---")) {
        acc.push(`and ${self.length - i} others`, "---");
      }
      return acc;
    }, []);

    const final = filteredPeople.filter((fp) => fp !== "---");

    return final.map(
      (person, i, self) => `${person}${i !== self.length - 1 ? ", " : "."}`
    );
  };

  const focusOnInput = (value) => {
    if (value === null) {
      setFocus(() => true);
    } else {
      setFocus(() => !focus);
    }
  };

  return (
    <>
      <cat-card class={"cat-mb-l cat-p-l post-card"} title="post-card">
        {/* HEADER START */}
        <div className="cat-flex cat-items-center cat-justify-between">
          <div className="cat-flex cat-items-center header">
            <cat-avatar src={avatar} label="avatar" round></cat-avatar>
            <div className="cat-ml-s">
              <div>{name}</div>
              <div className="cat-text-xs text">{post.postedAt}</div>
            </div>
          </div>
          <Link to={`user/${id}?postId=${post.postId}`}>View post</Link>
        </div>

        <div className="cat-hr cat-mv-m"></div>

        {/* CONTENT START */}
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
            ></img>
          </div>
        </div>

        {/* ACTIONS SECTION (LIKE / COMMENT) START */}
        <ActionsSection
          postData={{ userId: id, postId: post.postId, liked: post.liked }}
          emitFocus={focusOnInput}
        />
        <div className="cat-hr cat-mv-m"></div>

        {/* LIKED BY SECTION START */}
        <div className="cat-flex cat-items-center cat-text-xs">
          <span
            className={post.liked ? "cat-mr-s cat-text-primary" : "cat-mr-s"}
          >
            <cat-icon icon="thumbs-up-outlined" size="s" />
          </span>
          <span data-testid={"liked-by" + post.postId}>
            Liked by {post.liked ? "You, " : ""}
            {likedByList()}
          </span>
        </div>

        <div className="cat-hr cat-mv-m"></div>

        <AddCommentSection
          postData={{ userId: id, postId: post.postId }}
          focusInput={focus}
        />

        {post.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </cat-card>
    </>
  );
}

export default PostCard;
