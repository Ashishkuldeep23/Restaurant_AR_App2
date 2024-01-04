
// import React from 'react'

export const BillComponent = () => {
    return (
        <>

            <div className="w-full h-fullAk flex flex-col justify-center items-center rounded px-1 sm:px-5 py-10 ">


                <div className="border rounded p-1 bg-gray-100 " >




                    <div className=" flex flex-col sm:flex-row  justify-center">


                        {/* All cart itms with total price and total number (Loop run over all products)*/}

                        <div className=" xxs:w-72 my-2 mx-1  ">
                            <p className=" underline font-semibold text-xl my-1">Cart Details</p>

                            <div className=" rounded py-1 px-0.5 bg-white ">



                                <ul>
                                    <li className=" flex  justify-around font-semibold">
                                        <span className=" text-center capitalize">Masala papad</span>
                                        <span>1</span>
                                        <span className=" font-serif">₹ 90</span>
                                    </li>
                                    <li className=" flex justify-around font-semibold">
                                        <span className=" text-center capitalize">Butter Roti</span>
                                        <span>4</span>
                                        <span className=" font-serif">₹ 400</span>
                                    </li>
                                    <li className=" flex justify-around  font-semibold">
                                        <span className=" text-center capitalize">Jira Rice</span>
                                        <span>3</span>
                                        <span className=" font-serif">₹ 170</span>
                                    </li>
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
                                        <span className=" font-serif">₹ 990</span>
                                    </li>
                                    <li className=" flex justify-around font-semibold">
                                        <span className=" text-center w-32">GST</span>
                                        <span className=" font-serif">₹ 90</span>
                                    </li>
                                    <li className=" mt-auto py-3 border-t-2 border-dashed flex justify-around font-semibold">
                                        <span className=" text-center w-32">To Pay</span>
                                        <span className=" font-serif">₹ 1080</span>
                                    </li>
                                </ul>

                            </div>

                        </div>


                    </div>


                    <div className=" flex flex-col">
                        <p className=" font-semibold">Finished your Dinner ?</p>
                        <button className="bg-yellow-300 w-full rounded font-bold">I will pay at Counter</button>
                    </div>




                </div>


            </div>
        </>
    )
}


