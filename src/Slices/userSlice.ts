
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { OrderDataInterface } from "./orderSlice";
// import { useSelector } from "react-redux";




// // // Async routes here -------->

export const getUserDataWithToken = createAsyncThunk("user/verifyToken", async (token: string) => {

    let option: RequestInit = {
        credentials: 'include',
        headers: {
            "token": `${token}`
        }

    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/userDataByToken`, option)
    let data = await response.json();
    return data
})










export type TypeUserAddress = {
    id: string;
    city: string,
    street: string,
    country: string,
    pincode: string
}



export type TypeUserData = {
    // name: string;
    lastName: string;
    firstName: string;
    profilePic: string;
    role: string;
    email: string;
    id: string;
    address?: TypeUserAddress[];
    orders ?: OrderDataInterface[] ,
}



type TyepUserDataForSlice = {
    isLoading: boolean;
    isError: boolean;
    isSingIn: boolean;
    isLogIn: boolean;
    isFullFilled: boolean;
    isForgotFullFilled: boolean;
    errMsg: string;
    userData: TypeUserData;
    notification : string[]
}



const initialState: TyepUserDataForSlice = {
    isLoading: false,
    isError: false,
    isSingIn: false,
    isLogIn: false,
    isFullFilled: false,
    isForgotFullFilled: false,
    errMsg: "",
    userData: {
        // name: "",
        firstName: "",
        lastName: "",
        profilePic: "https://res.cloudinary.com/dlvq8n2ca/image/upload/v1700368567/ej31ylpxtamndu3trqtk.png",
        role: "",
        email: "",
        id: "",
        address: [],
        orders : []
    },
    notification : []
}





const userSlice = createSlice({

    name: "user",
    initialState,
    reducers: {

        setNotification(state , action){

           let actionData = action.payload as string

           state.notification.unshift(actionData)
        } ,

    },

    extraReducers: (builder) => {
        builder

            // // // fetchUser reducers with token ----->

            .addCase(getUserDataWithToken.pending, (state) => {
                state.isLoading = true
                state.isFullFilled = false
            })

            .addCase(getUserDataWithToken.fulfilled, (state, action) => {

                // console.log(action.payload)

                if (action.payload.status === false) {

                    state.errMsg = action.payload.message

                    state.isError = true

                    // toast.error(`${action.payload.message} | 400`, {
                    //     position: "top-right",
                    //     autoClose: 2000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: false,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "dark",
                    // })


                    alert(`${action.payload.message} | 400`)





                } else {

                    // toast.success(`${action.payload.message}`, {
                    //     position: "top-right",
                    //     autoClose: 2000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: false,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "dark",
                    // })


                    // // // Set is logIn True ------->

                    state.isLogIn = true
                    state.isFullFilled = true



                    // let name = action.payload.data.name
                    // let profilePic = action.payload.data.profilePic
                    // let role = action.payload.data.role
                    // let email = action.payload.data.email

                    // let { id, name, email, profilePic, role, address, token } = action.payload.data


                    // console.log(action.payload.data)


                    let token = action.payload.token



                    // // // set Some user data (Very minior data) ------>

                    // state.userData.name = name
                    // state.userData.email = email
                    // state.userData.profilePic = profilePic
                    // state.userData.role = role
                    // state.userData.id = id

                    if (token) {

                        // // // Now only cookie of browser --->
                        // localStorage.setItem("userToken", JSON.stringify(token))


                        // // TODO : and also we can set the token in cookie of browser with expire -->

                        let exdays = 20

                        const d = new Date();
                        d.setTime(d.getTime() + (exdays*24*60*60*60*1000));
                        let expires = "expires="+ d.toUTCString();

                        document.cookie = `token=${token};${expires}; path=/;`

                    }



                    state.userData = action.payload.data


                    // // // set data in localStorage ------>

                    // localStorage.setItem("userData", JSON.stringify({ name, email, profilePic, role, id, address }))
                    // localStorage.setItem("isUserLogIn", JSON.stringify(true))
                }


                // console.log(action.payload.message)

                state.isLoading = false

            })

            .addCase(getUserDataWithToken.rejected, (state, action) => {

                state.errMsg = action.error.message || 'Error occured'
                state.isLoading = false
                state.isError = true


                alert(`${action.error.message} || Error occured.`)

            })

    }

})



export const { setNotification } = userSlice.actions

export const userState = () => useSelector((state: RootState) => state.userRedcer)

export default userSlice.reducer




