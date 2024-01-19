
// import React from 'react'
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from "react"
import { cartState, removeItemsInCart } from "../../Slices/cartSlice"
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import { setChildrenModal, setOpenMoadl } from '../../Slices/ModalSlice';
// import { Navigate } from "react-router-dom"

export const BillComponent = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()
    const { cartData } = cartState()






    // // This Fn is used to show confirm page ----->

    function showConfirmModal() {

        // // // Model actual UI ---->
        let innerHTML = <div>
            <CartData />
            <ConfirmOrderWithTable />


        </div>

        dispatch(setOpenMoadl(true))
        dispatch(setChildrenModal(innerHTML))


    }



    // if cart is 0 then show this -->

    if (cartData.length <= 0) {
        return (
            <>
                <div className=' py-24 sm:py-36 w-full flex justify-center items-center '>
                    <div >

                        <div className='  flex flex-col items-center relative'>

                            <img
                                className=' rounded-full sm:w-1/2 '
                                src="https://i.pinimg.com/originals/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.png"
                                alt=""
                            />

                            <button
                                className=' absolute top-5 right-10 sm:right-1/3 border-2 mx-2 p-0.5 rounded-full'
                                onClick={() => { history.back() }}
                            >🔙</button>
                        </div>

                        <div className=' w-full flex flex-col items-center relative -top-5 sm:-top-10'>

                            {/* <p className=' font-semibold'>Your cart is <span className='text-orange-500'>Empty</span></p> */}
                            <p> <span className=' font-semibold text-orange-500'>No data found</span> in your cart</p>

                            <div>

                                <button
                                    onClick={() => { navigate("/") }}
                                    className=' py-1 px-3 my-1 font-semibold rounded-full bg-orange-500 text-white'
                                >Go to Home</button>


                            </div>




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
                    <CartData removeSingleItem={true} />

                    {/* Order btn ----> */}
                    <div className=" flex flex-col">
                        <p className=" font-semibold">Finished your Dinner ?</p>
                        <button
                            className="bg-yellow-300 w-full rounded font-bold"

                            onClick={() => { showConfirmModal() }}
                        >I will pay at Counter</button>
                    </div>


                </div>


            </div>
        </>
    )
}




export function CartData({ removeSingleItem = false }: { removeSingleItem?: boolean }) {

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


    return (
        <>

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

                                            {
                                                removeSingleItem
                                                &&

                                                <span className='absolute rounded mt-0.5 left-0 border'>
                                                    <button

                                                        className='border invisible group-hover:visible rounded px-0.5 bg-red-400 text-white font-bold'
                                                        onClick={() => { dispatch(removeItemsInCart(ele)); }}
                                                    >X</button>
                                                </span>
                                            }



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

                {
                    removeSingleItem
                    &&

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

                }


            </div>
        </>
    )
}





export function ConfirmOrderWithTable() {

    const totalAvilableTables = [1, 3, 4, 6, 7, 8, 10]    // // // This is avilable tables in restaurent currently.

    const [newTable, setNewTable] = useState(6)     // // // Selected Seat from QR (If match with avilable seat then default works).



    function confirmOrderBtn() {

        if (newTable === 0) {
            return alert("Plese select Table no.")
        }

        alert(`Order successfull, by table no.${newTable}`)
    }


    // console.log(newTable)

    return (
        <>

            <div className=' sm:px-12 flex justify-center items-center flex-wrap'>


                <div className=' m-1'>

                    <div>

                        <label htmlFor="table_num" className=' border-b border-yellow-300 '>Table No.</label>

                        <select
                            className=' border rounded border-yellow-300 font-semibold'
                            id="table_num"
                            onChange={(e) => { setNewTable(+e.target.value) }}
                            // size={2}
                            // defaultValue={newTable}
                            value={newTable}

                        >
                            <option value={0} >0</option>

                            {
                                totalAvilableTables.map((ele, i) => {
                                    return <option
                                        className=' bg-white'
                                        key={i}
                                        value={ele}
                                    >{ele}</option>

                                })
                            }

                        </select>

                    </div>

                    {/* <div>
                        <p>OR</p>
                        <p className=' border-b border-yellow-300 '>Table No. 7</p>
                    </div> */}

                </div>

                <button
                    className=' border px-1 m-1 rounded bg-yellow-300 font-bold '
                    onClick={() => { confirmOrderBtn() }}
                >Confirm Order</button>

            </div>
        </>
    )
}


