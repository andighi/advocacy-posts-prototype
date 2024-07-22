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

const createRenderContext = () => {
  const currentUser = initialData.users[0];
  const postToRender = currentUser.posts[0];

  renderWithProvider(<FeedPage />);

  return { currentUser, postToRender };
};

describe("Comment functionality", () => {
  // TEST 1
  it("Comment is added after submitting", async () => {
    const currentUser = initialData.users[0];
    const postToRender = currentUser.posts[2];

    renderWithProvider(<FeedPage />);

    const firstCardOld = await screen.findByTestId(
      "post-card" + postToRender.postId
    );

    const numberOfCommentsOld =
      firstCardOld.getElementsByClassName("comment").length;

    const commentInput = await screen.findByTestId(
      "comment-input" + postToRender.postId
    );

    const sendCommentButton = await screen.findByTestId(
      "send-comment-btn" + postToRender.postId
    );

    await userEvent.type(commentInput, "Thank you!");

    waitFor(() => expect(sendCommentButton).toBeEnabled(), {
      timeout: 2000,
    });

    await userEvent.click(sendCommentButton);

    const firstCard = await screen.findByTestId(
      "post-card" + postToRender.postId
    );

    const newNumberOfComments =
      firstCard.getElementsByClassName("comment").length;

    await waitFor(() =>
      expect(newNumberOfComments).toBe(numberOfCommentsOld + 1)
    );
  });

  // TEST 2
  it("'No comments yet' text is displayed when there are no comments", async () => {
    const currentUser = initialData.users[0];
    const postToRender = currentUser.posts.find(
      (post) => !post.comments.length
    );

    renderWithProvider(<FeedPage />);

    const card = await screen.findByTestId("post-card" + postToRender.postId);

    const noComments = card.getElementsByClassName("no-comments-yet")[0];

    expect(noComments).toHaveTextContent("No comments yet.");
  });

  // TEST 3
  it("Button is disabled when input is empty or only with spaces", async () => {
    const { postToRender } = createRenderContext();

    const commentInput = await screen.findByTestId(
      "comment-input" + postToRender.postId
    );
    const sendCommentButton = await screen.findByTestId(
      "send-comment-btn" + postToRender.postId
    );

    expect(sendCommentButton).toBeDisabled();

    await userEvent.type(commentInput, "     ");

    await waitFor(() => expect(sendCommentButton).toBeDisabled(), {
      timeout: 5000,
    });
  });
});
