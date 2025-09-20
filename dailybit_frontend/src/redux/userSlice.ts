import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userName: null,
        avatar: null,
        roles: null,
        token: null,
    },
    reducers: {
        setUser: (state, action) => {
            const user = action.payload;
            state.userName = user['userName'];
            state.avatar = user['avatar'];
            state.roles = user['roles']
            state.token = user['token'];
        },
        resetUser: (state) =>{
            state.userName = null;
            state.avatar = null;
            state.roles = null;
            state.token = null;
        }
    }
});

export const {setUser, resetUser} = userSlice.actions;
export default userSlice.reducer;