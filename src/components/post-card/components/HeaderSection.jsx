import { Link } from "react-router-dom";

function HeaderSection({ user, post }) {
  return (
    <>
      {/* HEADER START */}
      <div className="cat-flex cat-items-center cat-justify-between">
        <div className="cat-flex cat-items-center header">
          <cat-avatar src={user.avatar} label="avatar" round></cat-avatar>
          <div className="cat-ml-s">
            <div>{user.name}</div>
            <div className="cat-text-xs text">{post.postedAt}</div>
          </div>
        </div>
        <Link to={`user/${user.id}?postId=${post.postId}`}>View post</Link>
      </div>
    </>
  );
}

export default HeaderSection;
