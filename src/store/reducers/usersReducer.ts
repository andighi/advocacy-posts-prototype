import { createSlice } from '@reduxjs/toolkit'

export const usersReducer = createSlice({
    name: 'users',
    initialState: {
        users: []
    },
    reducers: {
        setInitialData: state => {
            const usersInfo = localStorage.getItem('users');
            if (usersInfo) {
                state.users = JSON.parse(usersInfo)
            }
        },
    }
})

export const { setInitialData } = usersReducer.actions

export default usersReducer.reducer