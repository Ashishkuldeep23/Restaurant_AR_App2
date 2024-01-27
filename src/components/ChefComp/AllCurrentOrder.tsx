


// import React from 'react'

const AllCurrentOrder = () => {
    return (
        <>

            <div className=" flex flex-col items-center bg-sky-200/70 min-h-screen ">


                <h1 className=" my-5">All currect order below</h1>

                <div className=" flex flex-wrap justify-center gap-5">

                    {

                        [null, null, null, null, null].map((ele, i) => {
                            return <SingleOrderData data={ele} key={i} i={i} />
                        })

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

            <div className=" flex r gap-4 justify-between flex-wrap">
                <p className=" font-bold">Table No: 9</p>
                <p>Received at: 8 PM</p>
                <p>Time Remaining: 15m</p>
            </div>



            <div className=" bg-white my-3 px-1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus sed fuga fugiat voluptatibus enim asperiores odio et eaque natus, error voluptatem nulla ullam ducimus culpa? In ut pariatur cupiditate hic.
            </div>


            <div className=" flex flex-wrap px-6">

                <button className={`mr-10 shadow-lg  ${i % 2 === 0 ? "bg-red-600" : " bg-green-700"} text-white px-4 `}>Processing</button>

                <p>Custom Instruction</p>

            </div>

        </div>
    )
}


