
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { gettingTokenInCookieAndLocalHost } from "../App";
import { CardDataInter } from "./cartSlice";


// import type { PayloadAction } from "@reduxjs/toolkit"
// // // Above will use in action object , see the docs.


export type createBody = {
    tableNumber: number,
    totalPrice: number,
    cartData: CardDataInter[],
    userId: string,
    status: "RECEIVED" | "PROCESSING" | "ON_TABLE" | "COMPLETED" | 'NOT_COMPLETED'
}


export const createOrder = createAsyncThunk("order/createOrder", async (body: createBody) => {


    // console.log(body)

    let option: RequestInit = {
        credentials: 'include',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "token": `${gettingTokenInCookieAndLocalHost()}`
        },
        body: JSON.stringify(body)

    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/createNewOrder`, option)
    let data = await response.json();
    return data
})





export interface OrderDataInterface {
    tableNumber: number,
    orderDate: string,
    preparationTime: string,
    totalPrice: number,
    cartData: CardDataInter[],
    userId: string,
    status: string,
    id: string
}




interface orderInterface {
    isLoading: boolean,
    isError: boolean,
    isFullFilled: boolean,
    errMsg: string,
    orderData: {}
}



const initialState: orderInterface = {
    isError: false,
    isFullFilled: false,
    isLoading: false,
    errMsg: "",
    orderData: {}
}



const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true
                state.isFullFilled = false
            })

            .addCase(createOrder.fulfilled, (state, action) => {

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

                    // // // Now set same product at two palces ---->
                    // state.singleProduct = action.payload.data
                    // state.currenProduct = action.payload.data


                    alert(`${action.payload.message}`)

                    // // // Remove cart data
                    localStorage.removeItem("AR_Cart")

                    // console.log(action.payload)


                    const { tableNumber, orderDate, preparationTime, totalPrice, cartData, userId, status, id } = action.payload.data


                    state.orderData = { tableNumber, orderDate, preparationTime, totalPrice, cartData, userId, status, id }




                }


                // console.log(action.payload.message)

                state.isLoading = false

            })

            .addCase(createOrder.rejected, (state, action) => {

                state.errMsg = action.error.message || 'Error occured'
                state.isLoading = false
                state.isError = true


                alert(`${action.error.message} || Error occured.`)

            })
    }
})



export const { } = orderSlice.actions

export const orderState = () => useSelector((state: RootState) => state.orderReducer)

export default orderSlice.reducer





