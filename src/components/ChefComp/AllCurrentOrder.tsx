
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { chefSliceData, getAllCurrentOrderData } from "../../Slices/chefSlice"
import { SingleOrder } from "../UserProfile/UserProfile"

const AllCurrentOrder = () => {

    const dispatch = useDispatch<AppDispatch>()

    const { chefOrderData } = chefSliceData()


    useEffect(() => {
        // // // Getting order data ------>
        dispatch(getAllCurrentOrderData())
    }, [])

    return (
        <>

            <div className=" bg-slate-950 text-white flex flex-col items-center bg-sky-200/70 min-h-screen ">


                <h1 className=" my-5 text-3xl">All currect order below</h1>

                <div className="flex flex-wrap justify-center items-start gap-7">

                    {


                        (chefOrderData.length > 0)

                            ? chefOrderData.map((order) => <SingleOrder key={order.id} ele={order} />)

                            : [null].map((ele, i) => <SingleOrderData data={ele} i={i} key={i} />)
                    }

                </div>

            </div>


        </>
    )
}

export default AllCurrentOrder






function SingleOrderData({ data, i }: { data: null, i: number }) {
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


