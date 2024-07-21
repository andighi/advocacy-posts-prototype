import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../store/store";
import initialData from "../../../initialData.json";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
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

describe("Like button functionality", () => {
  // TEST 1
  it("Like button changes text when liked by current user", async () => {
    const currentUser = initialData.users[0];
    const postToRender = currentUser.posts.find((post) => !post.liked);

    renderWithProvider(<FeedPage />);

    const likeButton = await screen.findByTestId(
      "like-button" + postToRender.postId
    );

    expect(likeButton).toHaveTextContent("Like");
    await userEvent.click(likeButton);

    const likeButtonNew = await screen.findByTestId(
      "like-button" + postToRender.postId
    );

    await waitFor(() => expect(likeButtonNew).toHaveTextContent("Liked"));
  });
});
