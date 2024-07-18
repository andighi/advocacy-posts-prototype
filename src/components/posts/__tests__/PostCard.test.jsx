import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../../store/store';
import initialData from '../../../initialData.json';
import userEvent from '@testing-library/user-event';
import App from '../../../App'
import { expect } from 'vitest';

const renderWithProvider = (ui, { reduxStore = store } = {}) => {
    return {
        ...render(<Provider store={reduxStore}>{ui}</Provider>),
        store: reduxStore,
    };
};

describe('Like button functionality', () => {
    it('The state changes when pressing on like button', async () => {
        renderWithProvider(<App />)
        const { posts } = initialData.users[0];
        const isPostLiked = posts[0].liked;
        const likeButton = screen.getByTestId("like-button" + posts[0].postId)
        await userEvent.click(likeButton)

        // assertions
        expect(store.getState().users.users[0].posts[0].liked).toBe(!isPostLiked);

    });

    it('The Liked by text changes', async () => {
        renderWithProvider(<App />)
        const { posts } = initialData.users[0];
        const isPostLiked = posts[0].liked;
        const likeButton = screen.getByTestId("like-button" + posts[0].postId)

        await userEvent.click(likeButton)

        const likedByText = screen.getByTestId("liked-by" + posts[0].postId)

        // assertions
        expect(likedByText).toHaveTextContent(isPostLiked ? 'Liked by You' : `Liked by ${posts[0].likedBy[0]}`)
    })
})