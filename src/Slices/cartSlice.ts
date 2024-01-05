import { createSlice } from "@reduxjs/toolkit";
import { TypeCustomizationsObj } from "./productSlice";



type CardDataInter = {
    id: string,
    name: string,
    category: string,
    price: number,
    quantity: number;
    model: string,
    customizations?: TypeCustomizationsObj,
    isNonVeg?: boolean
}




type InitailData = {

    cartData: CardDataInter[],
    totalPrice: number;
    GST: 12,   // // GST should present in percent (value like --> 12 and that is 12%) (Now 12 is fixed value for GSt)

}





const initialState: InitailData = {
    cartData: [],
    totalPrice: 0,
    GST: 12
}





const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
    },

    extraReducers: () => {
    }

})




export const { } = cartSlice.actions

export default cartSlice.reducer

