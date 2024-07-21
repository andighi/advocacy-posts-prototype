import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../store/store";
import initialData from "../../../initialData.json";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import FeedPage from "../../../views/FeedPage";

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

describe("Liked by section functionality", () => {
  // TEST 1

  it("The Liked by text changes when post has no likes and user clicks on like button", async () => {
    const currentUser = initialData.users[0];
    const postToRender = currentUser.posts.find(
      (post) => !post.likedBy.length && !post.liked
    );

    renderWithProvider(<FeedPage />);

    let likedByText = await screen.findByTestId(
      "liked-by" + postToRender.postId
    );

    expect(likedByText).toHaveTextContent(`No one liked this post yet.`);

    const likeButton = await screen.findByTestId(
      "like-button" + postToRender.postId
    );

    await userEvent.click(likeButton);

    await waitFor(() => {
      expect(
        screen.getByTestId("liked-by" + postToRender.postId)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("liked-by" + postToRender.postId).textContent
      ).toContain("Liked by You.");
    });
  });

  // TEST 2
  it("The Liked by text changes when post has likes, is not liked by current user and user clicks on like button", async () => {
    const currentUser = initialData.users[0];
    const postToRender = currentUser.posts.find(
      (post) => post.likedBy.length && !post.liked
    );

    renderWithProvider(<FeedPage />);

    let likedByText = await screen.findByTestId(
      "liked-by" + postToRender.postId
    );

    expect(likedByText).toHaveTextContent(
      `Liked by ${postToRender.likedBy[0]}`
    );

    let likeButton = await screen.findByTestId(
      "like-button" + postToRender.postId
    );

    await userEvent.click(likeButton);

    likeButton = await screen.findByTestId("like-button" + postToRender.postId);

    expect(likedByText).toHaveTextContent("Liked by You, ");
  });
});
