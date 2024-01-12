
// import React from 'react'
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from "react"
import { cartState, removeItemsInCart } from "../../Slices/cartSlice"
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { Link, useNavigate } from 'react-router-dom';
// import { Navigate } from "react-router-dom"

export const BillComponent = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()


    const { cartData, totalPrice, GST, itemClicked } = cartState()

    const [gstPrice, setGstPrice] = useState<string>("0")



    useEffect(() => {

        // if (cartData.length > 0) {

        // // // Calculate the GST price and set into Redux state
        let gstPriceInNumber = (totalPrice * (GST / 100)).toFixed(2)
        setGstPrice(gstPriceInNumber)

        // } else {

        // to user on pervious page ---->
        // history.back()
        // }


    }, [totalPrice])



    if (cartData.length <= 0) {
        return (
            <>
                <div className=' py-24 sm:py-36 w-full flex justify-center items-center '>
                    <div className=' flex flex-col items-center'>

                        <img
                            className=' rounded-full sm:w-1/2 '
                            src="https://i.pinimg.com/originals/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.png"
                            alt=""
                        />

                        <div className=' w-full flex flex-col items-center relative -top-5'>

                            <p className=' font-semibold'>Your cart is <span className='text-orange-500'>Empty</span></p>
                            <p>No data found in your cart</p>

                            <button
                                onClick={() => { navigate("/") }}
                                className=' py-1 px-3 my-1 font-semibold rounded-full bg-orange-500 text-white'
                            >Go to Home</button>
                        </div>

                    </div>
                </div>

            </>
        )
    }



    return (
        <>

            <div className=" relative w-full h-fullAk flex flex-col justify-center items-center rounded px-1 sm:px-5 py-10 ">
                <Link to={'/'}>
                    <button className=' border bg-yellow-200 rounded px-1 py-0.5 absolute right-2 top-2 font-bold'>Home</button>
                </Link>

                <div className="border rounded p-1 bg-gray-100 " >

                    {/* Cart Details ----> */}
                    <div className=" flex flex-col sm:flex-row  justify-center">


                        {/* All cart itms with total price and total number (Loop run over all products)*/}

                        <div className=" xxs:w-72 my-2 mx-1  ">
                            <p className=" underline font-semibold text-xl my-1">Cart Details</p>

                            <div className=" rounded pt-1 px-0.5 bg-white ">



                                <ul>

                                    {
                                        cartData.length > 0
                                            ?
                                            cartData.map((ele, i) => {
                                                return <li key={uuid()} className={`group flex  justify-around font-semibold border-b relative ${i === itemClicked && "border-red-300 border-2 rounded"} `}>

                                                    <span className='absolute rounded mt-0.5 left-0 border'>
                                                        <button

                                                            className='border invisible group-hover:visible rounded px-0.5 bg-red-400 text-white font-bold'
                                                            onClick={() => { dispatch(removeItemsInCart(ele)); }}
                                                        >X</button>
                                                    </span>

                                                    <span className=" capitalize flex flex-col text-center w-2/5">
                                                        <span>{ele.name}</span>
                                                        <span className=' text-xs ' style={{ fontSize: ".6rem" }}>{ele.customizations.sizes[0].name}/{ele.customizations?.crusts[0]?.name || ''} </span>
                                                    </span>
                                                    <span className=' flex items-center'>{ele.quantity}</span>

                                                    <span className=" capitalize flex flex-col text-center justify-center">
                                                        <span className=" font-serif">₹{ele.quantity * ele.price}</span>

                                                        {
                                                            ele.quantity > 1
                                                            &&
                                                            <span className=' text-xs ' style={{ fontSize: ".6rem" }}>
                                                                {ele.quantity} X <span className=" font-serif font-thin">₹{ele.price}</span>
                                                            </span>
                                                        }

                                                    </span>

                                                </li>
                                            })
                                            :
                                            <>
                                                {/* Dummy data ---> */}
                                                <li className=" flex justify-around font-semibold border-b">
                                                    <span className=" text-center capitalize">DButter Roti</span>
                                                    <span>4</span>
                                                    <span className=" font-serif">₹0</span>
                                                </li>
                                                <li className=" flex justify-around  font-semibold border-b">
                                                    <span className=" text-center capitalize">DJira Rice</span>
                                                    <span>3</span>
                                                    <span className=" font-serif">₹0</span>
                                                </li>
                                            </>
                                    }



                                </ul>

                            </div>

                        </div>



                        {/* Price ---> This will fixed only value get change */}

                        <div className=" xxs:w-72 my-2 mx-1  ">
                            <p className=" underline font-semibold text-xl my-1">Bill Details</p>

                            <div className=" rounded py-1 px-0.5 bg-white ">



                                <ul className=" h-36 flex flex-col">
                                    <li className=" flex justify-around font-semibold">
                                        <span className=" text-center w-32">Item Total</span>
                                        <span className=" font-serif">₹{totalPrice || 0}</span>
                                    </li>
                                    <li className=" flex justify-around font-semibold">
                                        <span className=" text-center w-32">GST <span className="text-xs">12%</span> </span>
                                        <span className=" font-serif">₹{gstPrice || 12}</span>
                                    </li>
                                    <li className=" mt-auto py-3 border-t-2 border-dashed flex justify-around font-semibold">
                                        <span className=" text-center w-32">To Pay</span>
                                        <span className=" font-serif">₹{(+gstPrice + totalPrice).toFixed(2)}</span>
                                    </li>
                                </ul>

                            </div>

                        </div>


                    </div>

                    {/* Order btn ----> */}
                    <div className=" flex flex-col">
                        <p className=" font-semibold">Finished your Dinner ?</p>
                        <button className="bg-yellow-300 w-full rounded font-bold">I will pay at Counter</button>
                    </div>


                </div>


            </div>
        </>
    )
}


