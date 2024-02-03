
// import React from 'react'

import { Navigate, useNavigate } from "react-router-dom"
import { userState } from "../../Slices/userSlice"
import { OrderDataInterface, OrderStatusOptions } from "../../Slices/orderSlice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { updateOrderStatusChef } from "../../Slices/chefSlice"
import { socket } from "../../App"



// // // This fn() will handle logOut logic ---->
export const logOutHadler = () => {

    document.cookie = 'token=;'

    setTimeout(() => {

        location.reload()
    }, 1000)

}



const UserProfile = () => {

    const { userData } = userState()

    // console.log(userData)


    // // /// "If user is not login"
    if (!userData.firstName && !userData.lastName) {
        return <Navigate to={'/'}></Navigate>
    }


    return (
        <>
            <div className="w-full flex flex-col justify-center items-center bg-slate-800">
                <div className=" w-full sm:w-4/6 h-4/6 bg-slate-900 text-white rounded border border-white flex flex-col items-center justify-center relative overflow-x-hidden overflow-y-auto ">

                    <img
                        src={userData.profilePic}
                        alt="user"
                        className=" border p-0.5 rounded-full"
                    />

                    <div>
                        <p>{userData.firstName} {userData.lastName}</p>
                    </div>

                    <p>{userData.email}</p>

                    <button
                        className=" bg-red-500 px-3 my-1 rounded-full"
                        onClick={() => { logOutHadler() }}
                    >Log Out</button>

                    <button
                        className=" border px-3 rounded-full absolute top-5 right-5"
                        onClick={() => { history.back() }}
                    >🔙Back</button>


                    {
                        userData.role === "chef"
                        &&
                        <div className=" my-10">
                            <p className=" bg-green-400 px-4 rounded font-bold">You are Chef</p>
                        </div>
                    }



                </div>


                <OldOrderDataUI />
            </div>

        </>
    )
}


export default UserProfile




const OldOrderDataUI = () => {

    const { userData } = userState()


    if (userData.orders && userData.orders?.length <= 0) return <h1> Not Previous order found. || 404</h1>


    return (
        <>

            <div
                // className=" mt-1 w-full sm:w-4/6 min-h-80 bg-slate-900 text-white rounded border border-white flex flex-col items-center justify-center relative overflow-x-hidden overflow-y-auto  "
                className=" my-10"
            >

                <h1 className=" text-center my-2 text-xl font-bold text-white underline">Your all orders</h1>


                <div
                    className=" text-white flex flex-wrap items-center justify-center"
                >

                    {userData.orders?.map((ele) => {
                        return <SingleOrder ele={ele} key={ele.id} shouldNavigate={true} />
                    })}

                </div>


            </div>


        </>
    )
}



export const SingleOrder = ({ ele, shouldNavigate = false }: { ele: OrderDataInterface, shouldNavigate?: boolean }) => {


    const navigate = useNavigate()

    const { clickedNotification, userData } = userState()

    function makeDateByDbStr(str: string): Date {
        return new Date(str)
    }


    useEffect(() => {


        if ((ele.status === "RECEIVED" || ele.status === "PROCESSING") && shouldNavigate) {
            // alert("Goto current order page.")

            console.log("Goto current order page.")

            navigate('/current-order')
        }

    }, [ele])


    return (
        <div className={` ${userData.role === "chef" && "border"} flex flex-col rounded shadow-xl shadow-gray-600 hover:scale-110 sm:hover:-translate-y-5 transition-all`}>
            <div
                key={ele.id}
                className={` flex flex-col flex-wrap border rounded m-1 px-1 py-4 xxs:w-72
                    ${ele.status !== "PROCESSING" ? "bg-emerald-700" : "bg-orange-700"}  
                    ${ele.id === clickedNotification && "ring-4 ring-red-500"}
                `}
            >
                <div className=" flex justify-between items-start">
                    <p className=" bg-orange-400 font-semibold px-1 sm:px-3 rounded">Table:{ele.tableNumber}</p>

                    <div className=" border-b flex  items-end ">
                        <p >{makeDateByDbStr(ele.orderDate).toLocaleTimeString()} | </p>
                        <p >{makeDateByDbStr(ele.orderDate).toLocaleDateString()}</p>
                    </div>
                </div>
                {/* <p>{makeDateAndTime(ele.orderDate)}</p> */}
                {/* <p>{makeDateAndTime(ele.preparationTime)}</p> */}
                {/* <p>{JSON.stringify(ele.cartData)}</p> */}



                <div className=" flex flex-wrap justify-center border-t mt-2">
                    <p className=" border-b text-center text-sm">Cart Data</p>
                    {
                        (ele.cartData.length > 0)

                        &&

                        ele.cartData.map((e, i) => {
                            return (
                                <div
                                    key={e.id}
                                    className=" bg-slate-800 border my-1 px-0.5 rounded relative w-full overflow-hidden xxs:w-4/5"
                                >

                                    <span className=" absolute -top-2 -left-1 border-2 border-yellow-500 px-1 rounded-full ">{i + 1}</span>

                                    <div className=" flex  justify-evenly">

                                        <p className=" capitalize">{e.name}</p>
                                        <p className=" capitalize">{e.category}</p>
                                    </div>
                                    <div className=" flex justify-between">

                                        <p>{e.isNonVeg ? "Veg" : "Non-Veg"} | </p>
                                        <p>{e.quantity} X ₹{e.price}</p>
                                        <p>₹{e.quantity * e.price}</p>
                                    </div>

                                    <div className=" flex justify-between">
                                        <p className=" capitalize">{e.customizations.sizes[0].name || ""}</p>
                                        <p className=" capitalize">At - ₹{e.customizations.sizes[0].additionalPrice}</p>

                                    </div>


                                    {
                                        e.customizations.crusts[0]
                                        &&

                                        <div className=" flex justify-between">
                                            <p className=" capitalize">{e.customizations.crusts[0].name || ""}</p>
                                            <p className=" capitalize">At - ₹{e.customizations.crusts[0].additionalPrice}</p>

                                        </div>
                                    }





                                </div>
                            )
                        })
                    }
                </div>


                <div className=" border-t flex  justify-between items-center px-1">

                    <p className=" text-center border-2 border-y-0 border-green-400 px-4 rounded my-1 font-bold">Status : {ele.status}</p>
                    <p className=" border-2 border-y-0 border-blue-400 px-2 sm:px-4 rounded">At :₹{ele.totalPrice}</p>

                </div>

                {/* <p className=" ">{makeDateAndTime(ele.orderDate)}</p> */}
                {/* Below update component should only show to chefs ---> */}


                {
                    ele.orderDate !== ele.preparationTime
                    &&
                    <p className=" text-center">Prepared At : {makeDateByDbStr(ele.preparationTime).toLocaleTimeString()}</p>
                }


            </div>


            {

                userData.role === "chef"
                &&
                <UpdateUiForChef ele={ele} />
            }



        </div>
    )
}


// // // Below comp only visiable for chef --------->
function UpdateUiForChef({ ele }: { ele: OrderDataInterface }) {


    type UpdateOrder = {
        id: string,
        status: OrderStatusOptions,
        time?: number
    }

    const dispatch = useDispatch<AppDispatch>()

    const [updateOrder, setUpdateOrder] = useState<UpdateOrder>({ id: "", status: "RECEIVED", time: 20 })

    // // Toggle tio show upadate ui --->
    const [showOption, setShowOption] = useState(false)


    const [optionArr, setOptionArr] = useState<OrderStatusOptions[]>([])


    function clickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        e.stopPropagation()

        if (updateOrder.status === "RECEIVED" && updateOrder.time === 20 && showOption === true) {
            // setShowOption(!showOption)
            return alert("Update something please.")
        } else {
            if (showOption === true) {
                alert(`Updating data ( status : ${updateOrder.status} and time : ${updateOrder.time} ) successfully.`)


                let date = new Date(Date.now())

                // console.log((date))


                let date1 = new Date(date.getTime() + (+(updateOrder.time || 1) * 60 * 1000))

                // console.log(date1)

                const time = date1.toISOString()
                // console.log(time)
                // // // Now call the backend

                if (updateOrder.status === 'PROCESSING') {
                    dispatch(updateOrderStatusChef({ whatUpdate: "chefStatus", orderId: ele.id, time: time, status: updateOrder.status }))
                }
                else if (updateOrder.status === "ON_TABLE") {
                    dispatch(updateOrderStatusChef({ whatUpdate: "chefStatus", orderId: ele.id, status: updateOrder.status }))
                }


                // // // Now sending notification ------>
                socket.emit("update-order-status", { ...ele })



            }
        }

        // // Do toggle thing last after all cases ---->
        setShowOption(!showOption)

    }



    // // // Setting option property and option here ------>
    useEffect(() => {

        // console.log(ele)

        setUpdateOrder({ ...updateOrder, id: ele.id, status: ele.status })

        if (ele.status === "RECEIVED") {
            setOptionArr(["RECEIVED", "PROCESSING", "CANCELED"])
        }

        if (ele.status === "PROCESSING") {
            setOptionArr(["PROCESSING", 'ON_TABLE', "CANCELED"])
        }


    }, [ele])




    return (
        <>


            <div className=" m-3 mt-0 border-t p-1 flex flex-col items-center">

                {
                    showOption
                    &&
                    <div className=" w-full relative ">

                        <span
                            className=" absolute top-0 right-0 border-2 border-red-400 text-red-400 rounded px-2 font-semibold "
                            onClick={() => { setShowOption(false) }}
                        >X</span>

                        <div className=" flex justify-center">

                            <label htmlFor="status">Status : </label>

                            <select
                                className=" bg-black border rounded my-0.5" id="status"
                                value={updateOrder.status}
                                onChange={(e) => { setUpdateOrder({ ...updateOrder, status: e.target.value as OrderStatusOptions }) }}
                            >
                                {
                                    optionArr.map((options, i) => {
                                        return <option
                                            key={i}
                                            // disabled={ e===updateOrder.status ? true : false}
                                            value={options}
                                            className={` ${options === 'CANCELED' && 'text-red-600 underline'}`}
                                        >{options}</option>
                                    })
                                }

                            </select>

                        </div>

                        {
                            ele.status === "RECEIVED"
                            &&
                            <>

                                <div className=" flex justify-center">

                                    <label htmlFor="time">Time : </label>

                                    <div className="  border rounded px-1 mx-2">

                                        <button
                                            onClick={(e) => { e.stopPropagation(); (updateOrder.time || 0) > 0 && setUpdateOrder({ ...updateOrder, time: +(updateOrder.time || 0) - 5 }) }}
                                        >-5</button>

                                        <input
                                            id="time"
                                            className=" bg-black border rounded mx-0.5 px-1"
                                            style={{ width: "30px" }}
                                            type="number"
                                            value={updateOrder.time}
                                            onChange={(e) => { e.stopPropagation(); setUpdateOrder({ ...updateOrder, time: +e.target.value }) }}
                                        />

                                        <button
                                            onClick={(e) => { e.stopPropagation(); setUpdateOrder({ ...updateOrder, time: +(updateOrder.time || 0) + 5 }) }}
                                        >+5</button>

                                    </div>

                                    {/* <input className=" bg-black" type="number" name="" id="" /> */}


                                </div>

                                <div>
                                    <p className=" text-center">+{updateOrder.time} Mins form now</p>
                                </div>

                            </>

                        }



                    </div>

                }

                {/* <div> */}
                <button
                    className={` px-3 rounded text-sm font-bold capitalize ${showOption ? "bg-green-400" : "border border-green-400 text-green-400"} `}
                    onClick={(e) => { clickHandler(e) }}
                >{showOption ? "Actual" : "Ready For"} Update</button>
                {/* </div> */}

            </div>
        </>
    )

}


