import {createSlice} from '@reduxjs/toolkit';
import { users } from '../utils/data';

const initialState = {
    user: JSON.parse(window?.localStorage.getItem("userInfo")) ?? users[1],
}

const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        login: (state, action) => {
            // cập nhật trạng thái user trong slice thành giá trị được truyền qua action.payload.user
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.user = null;
            localStorage?.removeItem('userInfo')
        }
    }
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer;