import {createSlice} from "@reduxjs/toolkit";

const storageUser = window.localStorage.getItem('ZoombaUser');
let isLogin = Boolean(storageUser);
let userData = (isLogin)?JSON.parse(storageUser):[];
console.log(userData);
const auth = createSlice({
    name:'auth',
    initialState:{
        isLogin: isLogin,
        user:userData
    },
    reducers:{
        loginUser:(state,{payload:{user}})=>{
            state.isLogin = true;
            state.user = user;
            window.localStorage.setItem('ZoombaUser',JSON.stringify(user));
        },
        logoutUser:(state)=>{
            state.isLogin = false;
            state.user = null;
            window.localStorage.removeItem('ZoombaUser');
        }
    }
})

export const {loginUser,logoutUser} = auth.actions;
export default auth.reducer;