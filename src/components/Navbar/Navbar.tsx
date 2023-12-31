
// import React from 'react'

import { Link } from "react-router-dom"
import { userState } from "../../Slices/userSlice"

export const Navbar = () => {

    const userData = userState().userData

    return (
        <>

            <div className=" bg-themeColor w-full h-16 border-b flex  items-center">
                {/* Home div */}
                <div className=" my-auto mr-auto ml-5 hover:scale-110 hover:cursor-pointer transition-all">
                    <Link to='/'>
                        <p
                            className=" font-bold px-2 rounded border text-white"

                        >HOME</p>
                    </Link>
                </div>


                {/* User image div */}
                <div className=" my-auto ml-auto mr-5 hover:scale-110 hover:cursor-pointer transition-all">

                    <Link to='/login'>
                        <img
                            className=" h-12 rounded-full border"
                            src={userData.profilePic}
                            alt=""

                        />
                    </Link>
                </div>

            </div>

        </>
    )
}


