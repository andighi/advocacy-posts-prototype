import { createSlice } from '@reduxjs/toolkit'
import { PostCardData } from '../../models/models';

interface UsersState {
    users: PostCardData[];
}

const initialState: UsersState = {
    users: []
}

export const usersReducer = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setInitialData: state => {
            const usersInfo = localStorage.getItem('users');
            if (usersInfo) {
                state.users = JSON.parse(usersInfo)
            }
        },

        updateLikeAction: (state, action) => {
            const user = state.users[action.payload.userIndex];
            const post = user.posts[action.payload.postIndex];
            const newPost = { ...post, liked: !action.payload.liked }
            state.users[action.payload.userIndex].posts[action.payload.postIndex] = newPost;
            setToLocalStorage(state.users);
        },

        addComment: (state, action) => {
            const user = state.users[action.payload.userIndex];
            const post = user.posts[action.payload.postIndex];
            const newComment = { id: Date.now(), name: user.name, avatar: user.avatar, text: action.payload.comment };
            post.comments.push(newComment);
            setToLocalStorage(state.users);
        }
    }
})

const setToLocalStorage = (payload: any) => {
    localStorage.setItem('users', JSON.stringify(payload));
}

export const { setInitialData, updateLikeAction, addComment } = usersReducer.actions

export default usersReducer.reducer