
// import React from 'react'

import { Navigate } from "react-router-dom"
import { userState } from "../../Slices/userSlice"

const UserProfile = () => {

    const { userData } = userState()

    const logOutHadler = () => {

        document.cookie = 'token=;'

        setTimeout(() => {

            location.reload()
        }, 1000)

    }



    // // /// "If user is not login"
    if (!userData.firstName && !userData.lastName) {
        return <Navigate to={'/'}></Navigate>
    }


    return (
        <>
            <div className="w-full h-dvh flex flex-col justify-center items-center bg-slate-800">
                <div className=" w-full sm:w-4/6 h-4/6 bg-slate-900 text-white rounded border border-white flex flex-col items-center justify-center relative ">

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
                        <div className=" mt-10">
                            <p className=" bg-green-400 px-4 rounded font-bold">You are Chef</p>
                        </div>
                    }

                </div>
            </div>

        </>
    )
}


export default UserProfile