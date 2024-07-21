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
            const { userIndex, postIndex } = getUserAndPost(state, action);

            if (userIndex !== null && postIndex !== null) {
                const newP = { ...state.users[userIndex].posts[postIndex], liked: !action.payload.liked }
                state.users[userIndex].posts[postIndex] = newP;
                setToLocalStorage(state.users);
            }
        },

        addComment: (state, action) => {
            const { userIndex, postIndex } = getUserAndPost(state, action)
            if (userIndex !== null && postIndex !== null) {
                state.users[userIndex].posts[postIndex].comments.push({ id: Date.now(), name: state.users[userIndex].name, avatar: state.users[userIndex].avatar, text: action.payload.comment })
                setToLocalStorage(state.users);
            }
        }
    }
})

const getUserAndPost = (state: UsersState, action: any) => {
    let userIndex = null;
    let postIndex = null;
    const user = state.users.find(user => user.userId === action.payload.userId);
    if (user) {
        userIndex = state.users.findIndex(user => user.userId === action.payload.userId);
        const post = user.posts.find(post => post.postId === action.payload.postId);
        if (post) {
            postIndex = user.posts.findIndex(post => post.postId === action.payload.postId);
        }
    }
    return { userIndex, postIndex }
}

const setToLocalStorage = (payload: any) => {
    localStorage.setItem('users', JSON.stringify(payload));
}

export const { setInitialData, updateLikeAction, addComment } = usersReducer.actions

export default usersReducer.reducer