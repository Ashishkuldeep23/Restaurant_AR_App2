import { createSlice, current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";



export type CardDataInter = {
    id: string,
    name: string,
    category: string,
    price: number,
    quantity: number;
    model: string,
    customizations: {
        sizes: { name: string, additionalPrice: number }[],
        crusts: { name: string, additionalPrice: number }[]
    },
    isNonVeg?: boolean
}



type InitailData = {

    // userId: string,
    cartData: CardDataInter[],
    whenCreated: string,
    totalPrice: number;
    itemClicked : number;
    // totalItems: number


    GST: 12,   // // GST should present in percent (value like --> 12 and that is 12%) (Now 12 is fixed value for GSt)

}



const initialState: InitailData = {
    // userId: "",
    cartData: [],
    whenCreated: "",
    totalPrice: 0,
    // totalItems: 0,
    GST: 12,
    itemClicked : -1
}





const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addItemInCart(state, action) {


            const { customizations, quantity } = action.payload as CardDataInter



            let cCartState = current(state)

            let item = null
            let indexOfItem = 0;


            // console.log(cCartState.cartData)
            // console.log(cCartState.cartData.length)


            for (let i = 0; i < cCartState.cartData.length; i++) {

                // console.log(cCartState.cartData[i].verity)
                let ele = cCartState.cartData[i]

                if ((ele.customizations?.sizes[0]?.name === customizations?.sizes[0]?.name) && (ele.customizations?.crusts[0]?.name === customizations?.crusts[0]?.name)) {

                    // console.log(cCartState.cartData[i])

                    item = cCartState.cartData[i]
                    indexOfItem = i
                    break

                }
            }


            let newCartArr = [...cCartState.cartData]

            if (item) {
                // alert("Agian dedected ....")

                let newItemObject = { ...item, quantity: item.quantity + quantity }

                // console.log(index , item)

                newCartArr.splice(indexOfItem, 1, newItemObject)

                // console.log(newCartArr)

                // // // cart data upadte --->
                state.cartData = newCartArr

                // // Total price upadte --->
                state.totalPrice = state.totalPrice + (item.quantity * item.price)

            } else {
                // // Add --->

                newCartArr.unshift(action.payload)
                state.cartData = newCartArr
                // // OR
                // state.cartData.unshift(action.payload)


                // state.totalItems = state.totalItems + 1
                state.totalPrice = state.totalPrice + (action.payload.quantity * action.payload.price)
            }



            // // And also update total price ---->

        },


        removeItemsInCart(state, action) {

            let item = action.payload as CardDataInter


            let cCartState = current(state)


            let findItemsInCart = cCartState.cartData.filter((ele) => {

                if (ele.id === item.id) {

                    if (ele.customizations.sizes[0]?.name === item.customizations.sizes[0]?.name) {

                        if (ele.customizations?.crusts[0]?.name !== item.customizations?.crusts[0]?.name) {
                            return ele
                        }


                    } else {
                        return ele
                    }

                } else {
                    return ele
                }
            })

            // console.log(findItemsInCart)


            let newTotalPrice = findItemsInCart.reduce((acc, item) => acc + item.price, 0)

            // console.log(newTotalPrice)


            state.cartData = findItemsInCart
            state.totalPrice = newTotalPrice



        },


        setItemsClicked(state , action){
            state.itemClicked = action.payload
        }

    },

    extraReducers: () => {
    }

})




export const { addItemInCart, removeItemsInCart , setItemsClicked } = cartSlice.actions


export const cartState = () => useSelector((state: RootState) => state.cartReducer)

export default cartSlice.reducer

