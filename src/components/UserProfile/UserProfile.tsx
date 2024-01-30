
// import React from 'react'

import { Navigate, useNavigate } from "react-router-dom"
import { userState } from "../../Slices/userSlice"
import { OrderDataInterface } from "../../Slices/orderSlice"
import { useEffect } from "react"

const UserProfile = () => {

    const { userData } = userState()

    const logOutHadler = () => {

        document.cookie = 'token=;'

        setTimeout(() => {

            location.reload()
        }, 1000)

    }


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


                <div className=" text-white  flex flex-wrap items-center justify-center">

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


    function makeDateAndTime(str: string) {

        let date = new Date(str)

        // console.log( date.getHours() , date.getMinutes() , date.getMonth() , date  ,  date.toDateString() )

        let formatedDate = `${date.getHours()}:${date.getMinutes()} - ${date.toDateString()}`
        return formatedDate

    }




    useEffect(() => {


        if ((ele.status === "RECEIVED") && shouldNavigate) {
            // alert("Goto current order page.")



            console.log("Goto current order page.")

            navigate('/current-order')
        }


    }, [ele])


    return (
        <>
            <div
                key={ele.id}
                className={` flex flex-col border rounded m-1 px-1 py-4 ${ele.status === "PROCESSING" && "bg-lime-900"}`}
            >
                <p className=" text-center bg-green-400 px-4 rounded mx-auto my-1 font-bold">{ele.status}</p>
                <div className=" flex justify-between">

                    <p className=" bg-orange-400 px-2 sm:px-4 rounded">Table:{ele.tableNumber}</p>
                    <p className=" bg-blue-400 px-2 sm:px-4 rounded">At :₹{ele.totalPrice}</p>
                </div>
                {/* <p>{makeDateAndTime(ele.orderDate)}</p> */}
                {/* <p>{makeDateAndTime(ele.preparationTime)}</p> */}
                {/* <p>{JSON.stringify(ele.cartData)}</p> */}

                <p className=" border-b text-center text-sm  mt-2">Cart Data</p>

                <div className=" felx flex-wrap">
                    {
                        (ele.cartData.length > 0)

                        &&

                        ele.cartData.map((e, i) => {
                            return (
                                <div
                                    key={e.id}
                                    className="border my-1 px-0.5 rounded relative"
                                >

                                    <span className=" absolute -top-2 -left-1 border border-yellow-300 px-1 rounded-full ">{i + 1}</span>

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



                <p className=" border-t">{makeDateAndTime(ele.orderDate)}</p>
                {/* <p>{makeDateAndTime(ele.preparationTime)}</p> */}


            </div>
        </>
    )
}


