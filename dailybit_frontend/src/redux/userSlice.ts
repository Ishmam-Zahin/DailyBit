import { User } from "@/helper/types";
import { createSlice } from "@reduxjs/toolkit";

const userStae: User = {
    userName: null,
    avatarLink: null,
    role: null,
    token: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: userStae,
    reducers: {
        setUser: (state, action) => {
            const user: User = action.payload;
            state.userName = user.userName
            state.avatarLink = user.avatarLink
            state.role = user.role
            state.token = user.token
        },
        resetUser: (state) => userStae,
    }
});

export const {setUser, resetUser} = userSlice.actions;
export default userSlice.reducer;