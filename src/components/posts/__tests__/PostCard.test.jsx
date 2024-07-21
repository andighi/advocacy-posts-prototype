import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../store/store";
import initialData from "../../../initialData.json";
import userEvent from "@testing-library/user-event";
import Feed from "../../../views/FeedPage";
import { expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

const renderWithProvider = (ui, { reduxStore = store } = {}) => {
  return {
    ...render(
      <Provider store={reduxStore}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    ),
    store: reduxStore,
  };
};

describe("Like button functionality", () => {
  it("The state changes when pressing on like button", async () => {
    renderWithProvider(<Feed />);
    const { posts } = initialData.users[0];
    const isPostLiked = posts[0].liked;
    const likeButton = screen.getByTestId("like-button" + posts[0].postId);
    await userEvent.click(likeButton);

    // assertions
    expect(store.getState().users.users[0].posts[0].liked).toBe(!isPostLiked);
  });

  it("The Liked by text changes", async () => {
    renderWithProvider(<Feed />);
    const { posts } = initialData.users[0];
    const isPostLiked = posts[0].liked;
    const likeButton = screen.getByTestId("like-button" + posts[0].postId);

    await userEvent.click(likeButton);

    const likedByText = screen.getByTestId("liked-by" + posts[0].postId);

    // assertions
    expect(likedByText).toHaveTextContent(
      isPostLiked ? "Liked by You" : `Liked by ${posts[0].likedBy[0]}`
    );
  });
});

describe("Comment functionality", () => {
  it("Comment is added after submitting", async () => {
    renderWithProvider(<Feed />);
    const { posts } = initialData.users[0];

    const firstCardOld = screen.getAllByTestId("post-card")[0];
    const numberOfCommentsOld =
      firstCardOld.getElementsByClassName("comment").length;

    const commentInput = screen.getByTestId("comment-input" + posts[0].postId);
    const sendCommentButton = screen.getByTestId(
      "send-comment-btn" + posts[0].postId
    );

    await userEvent.type(commentInput, "Thank you!");

    waitFor(() => expect(sendCommentButton).toBeEnabled(), { timeout: 2000 });

    await userEvent.click(sendCommentButton);

    const firstCard = screen.getAllByTestId("post-card")[0];

    const newNumberOfComments =
      firstCard.getElementsByClassName("comment").length;

    expect(newNumberOfComments).toBe(numberOfCommentsOld + 1);
  });
});
