// import React from 'react'

import { Navigate } from "react-router-dom"
import { userState } from "../../Slices/userSlice"
import AllCurrentOrder from "./AllCurrentOrder"

export const ChefComp = () => {

  const { userData } = userState()





  if (userData.role !== "chef") {

    return <Navigate to={"/"}></Navigate>

  }


  return (
    <>

      <div className=" w-full h-screen ">


        <AllCurrentOrder />

      </div>


    </>
  )
}
