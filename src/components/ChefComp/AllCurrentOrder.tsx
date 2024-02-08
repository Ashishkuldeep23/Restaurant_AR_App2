
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { chefSliceData, getAllCurrentOrderData } from "../../Slices/chefSlice"
import { SingleOrder, logOutHadler } from "../UserProfile/UserProfile"
import { LoaderCircle } from "../LoaderCircle/LoaderCircle"
import { useNavigate } from "react-router-dom"

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



                <div className="flex flex-wrap justify-center items-start gap-7">

                    {


                        (chefOrderData.length > 0)

                            ? chefOrderData.map((order) => <SingleOrder key={order.id} ele={order} forChef={true} />)

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










// function SingleCurrentOrderForChef(){

// }









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


