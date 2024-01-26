
// import React from 'react'

import { Link, useLocation, useNavigate } from "react-router-dom"
import { userState } from "../../Slices/userSlice"

export const Navbar = () => {

    const navigate = useNavigate()

    const userData = userState().userData

    const location = useLocation()

    // console.log(location);



    return (
        <>

            <div className=" bg-themeColor w-full h-16 border-b flex  items-center z-10 relative">
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

                    <Link to={userData.firstName ? "/profile" : "/login"}>
                        <img

                            // onClick={()=>{userData.firstName ? "" : navigate("/login")}}
                            className=" h-12 rounded-full border"
                            src={userData.profilePic}
                            alt=""

                        />
                    </Link>
                </div>

            </div>



            {/* <div className=""> */}

            {
                (userData.role === "chef" && location.pathname !== "/chef-page")
                &&

                <div className=" sticky top-0 left-1/2 z-50 flex  justify-center">
                    <button
                        className="  bg-sky-200/50 backdrop-blur-3xl capitalize font-bold  my-0.5  px-4 py-0.5 border  border-sky-400 text-sky-950 rounded-full "
                        onClick={() => { navigate("/chef-page") }}
                    >Goto chef Page</button>
                </div>


            }
            {/* </div> */}


        </>
    )
}


