

// import React from 'react'

import { useEffect, useState } from "react"
import { OrderDataInterface } from "../../Slices/orderSlice"
import { userState } from "../../Slices/userSlice"
import { SingleOrder } from "../UserProfile/UserProfile"


const CurrentOrderComp = () => {

    const [currentOrderArr, setCurrentOrderArr] = useState<OrderDataInterface[]>([])

    const { userData } = userState()

    useEffect(() => {

        if (userData.orders) {


            let currentOrders = userData.orders.filter((ele) => {
                if (ele.status === "RECEIVED" || ele.status === "PROCESSING") {
                    return ele
                }
            })

            // console.log(currentOrders)

            setCurrentOrderArr(currentOrders)
        }
    }, [userData])



    if (currentOrderArr && currentOrderArr.length <= 0) return <h1> Not Previous order found. || 404</h1>

    return (
        <>
            <div
                className="w-full flex flex-col justify-center items-center bg-slate-800 min-h-screen"
            >

                <div
                    // className=" mt-1 w-full sm:w-4/6 min-h-80 bg-slate-900 text-white rounded border border-white flex flex-col items-center justify-center relative overflow-x-hidden overflow-y-auto  "
                    className=" my-10"

                >

                    <h1 className=" text-center my-2 text-xl font-bold text-white underline">Your all orders</h1>


                    <div className=" text-white  flex flex-wrap items-center justify-center">

                        {userData.orders?.map((ele) => {
                            return <SingleOrder key={ele.id} ele={ele} />
                        })}

                    </div>


                </div>

            </div>


        </>
    )
}

export default CurrentOrderComp
