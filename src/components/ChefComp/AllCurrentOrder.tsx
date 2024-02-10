
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { chefSliceData, getAllCurrentOrderData } from "../../Slices/chefSlice"
import { UpdateUiForChef, logOutHadler, makeDateByDbStr } from "../UserProfile/UserProfile"
import { LoaderCircle } from "../LoaderCircle/LoaderCircle"
import { useNavigate } from "react-router-dom"
// import toast from "react-hot-toast"
import { OrderDataInterface } from "../../Slices/orderSlice"

const AllCurrentOrder = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()

    const { chefOrderData, isLoading } = chefSliceData()


    useEffect(() => {
        // // // Getting order data ------>
        dispatch(getAllCurrentOrderData())
    }, [])

    return (
        <>

            <div
                className="relative bg-slate-950 text-white flex flex-col items-center  bg-sky-200/70 min-h-screen bg-contain bg-[url('https://img.freepik.com/premium-photo/empty-wood-table-top-with-chef-cooking-restaurant-kitchen-blurred-defocused-background_688350-3953.jpg')] pb-16 sm:pt-28 "
            >

                <button
                    className=" font-semibold text-sm px-3 rounded border absolute right-2 top-2 bg-black"
                    onClick={() => { dispatch(getAllCurrentOrderData()) }}
                >↻Refresh</button>


                <LoaderCircle isLoading={isLoading} />

                <h1 className=" mt-5 text-4xl bg-slate-950 rounded px-3 text-center">Your kitchen</h1>
                <h1 className="mb-5 text-3xl bg-slate-950 rounded px-3 text-center">All currect order below</h1>

                {
                    (chefOrderData.length === 0)
                    &&
                    <h1 className=" my-5 text-xl bg-slate-950 rounded px-3 ">No current order found.(wait for order by Customer)</h1>
                }


                {/* This is Ui For chef -----> */}
                <div className="flex flex-wrap justify-center items-start gap-7">

                    {


                        (chefOrderData.length > 0)

                            ? chefOrderData.map((order) => <SingleCurrentOrderForChef key={order.id} ele={order} />)

                            : [null].map((ele, i) => <SingleDummyOrder data={ele} i={i} key={i} />)
                    }

                </div>



                {/* <div className=" mt-5 flex justify-center flex-col items-center"> */}
                <p
                    className=" border px-2 ml-auto mt-5 mr-3 rounded text-sm font-bold bg-red-500 absolute right-2 bottom-2 "
                    onClick={() => { logOutHadler(); navigate("/"); }}
                >LogOut</p>
                {/* </div> */}


            </div>


        </>
    )
}

export default AllCurrentOrder




export function SingleCurrentOrderForChef({ ele }: { ele: OrderDataInterface }) {


    // const { chefOrderData } = chefSliceData()

    const [timeRemaining, setTimeRemaining] = useState<number>(15)


    function calculateRemainingTime(time: string) {
        // console.log(time)

        let dateAtPepare = new Date(time)

        let dateNow = new Date()

        var differenceValue = (dateAtPepare.getTime() - dateNow.getTime()) / 1000;
        differenceValue /= 60;
        let timeGotInMints = Math.round(differenceValue)

        console.log(timeGotInMints)

        setTimeRemaining(timeGotInMints)

        // console.log(dateAtPepare)
    }


    useEffect(() => {


        // console.log(ele.preparationTime)

        if (ele.orderDate !== ele.preparationTime) {

            calculateRemainingTime(ele.preparationTime)


            if (timeRemaining > 0) {

                setInterval(() => {

                    calculateRemainingTime(ele.preparationTime)
                }, 60000)
            }

        }

    }, [])



    return (
        <>

            <div className={` bg-slate-800 flex flex-col rounded shadow-xl shadow-gray-600 hover:scale-110 sm:hover:-translate-y-5 transition-all`}>
                <div
                    key={ele.id}
                    className={` flex flex-col flex-wrap border rounded m-1 px-1 py-4 xxs:w-72 text-black
                        ${ele?.status === "PROCESSING" ? "bg-orange-300" : ele?.status === "ON_TABLE" ? ' bg-sky-500' : ele?.status === 'CANCELED' ? "bg-red-500" : "bg-green-500"}  
                        `}
                >
                    <div className=" flex justify-between items-start">
                        <p className=" font-bold px-1 sm:px-3 rounded">Table:{ele.tableNumber}</p>

                        <div className=" border-b flex  items-end ">
                            <span>Received At :</span>
                            <p >{makeDateByDbStr(ele.orderDate).toLocaleTimeString()}  </p>
                            {/* <p >{makeDateByDbStr(ele.orderDate).toLocaleDateString()}</p> */}
                        </div>


                    </div>

                    <div>

                        {
                            ele.orderDate !== ele.preparationTime
                            &&

                            <div>
                                {
                                    timeRemaining > 0
                                        ? <p className=" text-end capitalize font-bold">Time Remaining: {timeRemaining} mins</p>

                                        : <p className=" text-center text-sm">The time left has reached <span className=" font-bold">0.</span> Please change the status accordingly.</p>
                                }
                            </div>

                        }

                    </div>

                    {/* <p>{makeDateAndTime(ele.orderDate)}</p> */}
                    {/* <p>{makeDateAndTime(ele.preparationTime)}</p> */}
                    {/* <p>{JSON.stringify(ele.cartData)}</p> */}



                    <div className=" flex flex-col items-center  justify-center border-t mt-2">
                        <p className=" border-b text-center text-sm text-slate-200 font-semibold">Cart Data</p>
                        {
                            (ele.cartData.length > 0)

                            &&
                            <div className="bg-slate-200 rounded ">{

                                ele.cartData.map((e, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className=" border-b-slate-600 border my-1 px-0.5 relative w-full overflow-hidden "
                                        >

                                            <div className=" flex justify-between flex-wrap gap-2 capitalize">
                                                <p>{e.name}</p>
                                                <p>
                                                    <span>{e.customizations.sizes[0].name || ""}</span>
                                                    {
                                                        e.customizations.crusts[0]
                                                        &&
                                                        <span >{e.customizations.crusts[0].name || ""}</span>
                                                    }

                                                </p>
                                                <p>{e.quantity}</p>
                                            </div>





                                        </div>
                                    )
                                })

                            }</div>

                        }
                    </div>

                    {
                        ele.orderDate !== ele.preparationTime
                        &&
                        <p className=" text-center">Prepared At : {makeDateByDbStr(ele.preparationTime).toLocaleTimeString()}</p>
                    }


                    <div className=" border-t flex  gap-3 items-center px-1">

                        <p className={` text-center px-2 rounded my-1 font-bold text-white
                                 ${ele?.status === "PROCESSING" ? "bg-orange-800" : ele?.status === "ON_TABLE" ? ' bg-sky-800' : 'bg-green-800'}
                                `}

                        >{ele.status}</p>

                        {/* {
                            // !forChef
                            // &&
                            <p className=" border-2 border-y-0 border-blue-400 px-2 sm:px-4 rounded">At :₹{ele.totalPrice}</p>
                        } */}

                    </div>


                    <div>
                        { 
                            <UpdateUiForChef ele={ele} isBgBlack={true} />
                        }
                    </div>

                    {/* <p className=" ">{makeDateAndTime(ele.orderDate)}</p> */}
                    {/* Below update component should only show to chefs ---> */}

                </div>

            </div>
        </>
    )

}



function SingleDummyOrder({ data, i }: { data: null, i: number }) {
    return (
        <div

            onClick={() => { console.log(data) }}

            className={`shadow-2xl mx-1 w-full sm:w-2/5 ${i % 2 === 0 ? "bg-orange-400" : " bg-emerald-400"} p-1.5 rounded-md`}
        >

            <h1>Not Found DATA | 404</h1>

            <div className=" flex r gap-4 justify-between flex-wrap">
                <p className=" font-bold">Table No: 9</p>
                <p>Received at: 8 PM</p>
                <p>Time Remaining: 15m</p>
            </div>

            <div className=" bg-slate-800 my-3 px-1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus sed fuga fugiat voluptatibus enim asperiores odio et eaque natus, error voluptatem nulla ullam ducimus culpa? In ut pariatur cupiditate hic.
            </div>

            <div className=" flex flex-wrap px-6">

                <button className={`mr-10 shadow-lg  ${i % 2 === 0 ? "bg-red-600" : " bg-green-700"} text-white px-4 `}>Processing</button>

                <p>Custom Instruction</p>

            </div>

        </div>
    )
}


