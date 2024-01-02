
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
// import { gettingTokenInCookieAndLocalHost } from "../App";






// // // Async routes here -------->

export const fetchAllProduct = createAsyncThunk("product/fetchAllProduct", async () => {

    let option: RequestInit = {
        credentials: 'include',
        // headers: {
        //     "token": `${gettingTokenInCookieAndLocalHost()}`
        // }

    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/all-product`, option)
    let data = await response.json();
    return data
})



export const fetchOneProduct = createAsyncThunk("product/fetchOneProduct" ,async (id:string) => {
    let option: RequestInit = {
        credentials: 'include',
        // headers: {
        //     "token": `${gettingTokenInCookieAndLocalHost()}`
        // }

    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/one-product/${id}`, option)
    let data = await response.json();
    return data
})





type TypeCustomizations = {
    sizes:{name: string,additionalPrice: number}[],
    crusts: {name: string,additionalPrice: number}[]
}


export type TypeSingleProduct = {

    id: string,

    name: string,

    category: string,

    price: number,

    discountPercentage: number,

    customizations ?: TypeCustomizations,

    model: string,

    review ?: [],

    rating: {
        totalPerson: number,
        totalStars: number
    },

    likes: number,
    
    dislikes: number,

    likedUserIds: string[],

    dislikedUserIds: string[],


}


type TypeProductInitial = {
    isLoading:  boolean,
    isError: boolean ,
    isFullFilled:  boolean,
    isForgotFullFilled:  boolean,
    errMsg: string,
    allProroductData : TypeSingleProduct[],
    singleProduct : TypeSingleProduct
}


const initialState : TypeProductInitial = {
    isLoading: false,
    isError: false,
    isFullFilled: false,
    isForgotFullFilled: false,
    errMsg: "",
    allProroductData: [],
    singleProduct : {
        id: '',

        name: '',
    
        category: '',
    
        price: 0,
    
        discountPercentage: 0,
    
        customizations : {
            sizes : [] ,
            crusts : []
        },
    
        model: '',
    
    
    
        review : [],
    
        rating: {
            totalPerson: 0,
            totalStars: 0
        },
    
    
        likes: 0,
        
        dislikes: 0,
    
        likedUserIds: [],
    
        dislikedUserIds: [],
    }
}

const productSlice = createSlice({

    name: "user",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            // // // Fetc all products ----->

            .addCase(fetchAllProduct.pending, (state) => {
                state.isLoading = true
                state.isFullFilled = false
            })

            .addCase(fetchAllProduct.fulfilled, (state, action) => {

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

                    
                    state.allProroductData = action.payload.data

                }


                // console.log(action.payload.message)

                state.isLoading = false

            })

            .addCase(fetchAllProduct.rejected, (state, action) => {

                state.errMsg = action.error.message || 'Error occured'
                state.isLoading = false
                state.isError = true


                alert(`${action.error.message} || Error occured.`)

            })



            .addCase(fetchOneProduct.pending, (state) => {
                state.isLoading = true
                state.isFullFilled = false
            })

            .addCase(fetchOneProduct.fulfilled, (state, action) => {

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

                    
                    state.singleProduct = action.payload.data

                }


                // console.log(action.payload.message)

                state.isLoading = false

            })

            .addCase(fetchOneProduct.rejected, (state, action) => {

                state.errMsg = action.error.message || 'Error occured'
                state.isLoading = false
                state.isError = true


                alert(`${action.error.message} || Error occured.`)

            })

    }

})





export const { } = productSlice.actions

export const productState = () => useSelector((state: RootState) => state.productReducer)

export default productSlice.reducer





