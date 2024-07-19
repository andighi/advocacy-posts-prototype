import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import FeedPage from "../views/FeedPage";
import PostPage from "../views/PostPage";

function router() {
  return createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <div>Sth went wrong</div>,
      children: [
        {
          path: "/posts",
          element: <FeedPage />,
        },
        { path: "/posts/user/:userId", element: <PostPage /> },
      ],
    },
  ]);
}

export default router;
