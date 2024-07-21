import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { setInitialData } from "../store/reducers/usersReducer";
import initialUsersInfo from "../initialData.json";

function PostPage() {
  const usersInfo = useSelector((state) => state.users.users);
  const [user, setUser] = useState({});
  const [post, setPost] = useState({});
  const { userId } = useParams();
  const [query] = useSearchParams();
  const dispatch = useDispatch();

  const setUserAndPostData = () => {
    const currentUser = usersInfo.find(
      (user) => user.userId === Number(userId)
    );

    if (currentUser) {
      setUser(() => currentUser);
      const currentPost = currentUser.posts.find(
        (post) => post.postId === Number(query.get("postId"))
      );
      setPost(() => currentPost);
    }
  };

  useEffect(() => {
    if (!usersInfo || !usersInfo.length) {
      dispatch(setInitialData());
    }
    setUserAndPostData();
  }, [usersInfo]);

  return (
    <>
      <div className="cat-p-xl">
        <cat-card>
          <div className="cat-flex cat-items-center cat-justify-between">
            <div className="cat-flex cat-items-center header">
              <cat-avatar
                src={user.avatar}
                label="avatar"
                round
                size="xl"
              ></cat-avatar>
              <div className="cat-ml-s">
                <div>{user.name}</div>
                <div className="cat-text-s text">{post.postedAt}</div>
              </div>
            </div>
            <div className="cat-text-xl text cat-ml-l cat-text-center">
              {post.title}
            </div>
            <div className="cat-text-l text  cat-diaplay-flex cat-items-center cat-text-primary">
              <cat-icon icon="thumbs-up-outlined" size="xl" />
              <span>
                Liked by{" "}
                {post.likedBy ? (
                  post.likedBy.length ? (
                    post.likedBy.length
                  ) : (
                    <span>no one</span>
                  )
                ) : (
                  0
                )}
              </span>
            </div>
          </div>
        </cat-card>
        <img src={post.image} alt="Picture should be here" />
        <div className="cat-text-l cat-mt-m cat-flex cat-justify-between ">
          <div>{post.text}</div>
          <div className="">
            <cat-icon icon="comment-outlined" size="xl" />
            {post.comments ? post.comments.length : 0}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostPage;
