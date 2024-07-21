import PostCard from "../components/post-card/PostCard";
import { useEffect, useState } from "react";
import initialUsersInformation from "../initialData.json";
import { useDispatch, useSelector } from "react-redux";
import { setInitialData } from "../store/reducers/usersReducer";

function FeedPage() {
  const usersInfo = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [initialUsersInfo] = useState(initialUsersInformation.users);

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(initialUsersInfo));
    }
    dispatch(setInitialData());
  }, []);

  return (
    <>
      <div className="posts-container cat-p-xl">
        {usersInfo &&
          usersInfo.map((user) =>
            user.posts.map((post) => (
              <PostCard
                userId={user.userId}
                name={user.name}
                avatar={user.avatar}
                post={post}
                key={post.postId}
              />
            ))
          )}
      </div>
    </>
  );
}

export default FeedPage;
