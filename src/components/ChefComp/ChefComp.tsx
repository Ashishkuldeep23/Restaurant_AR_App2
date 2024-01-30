// import React from 'react'

import { Navigate } from "react-router-dom"
import { setNotification, userState } from "../../Slices/userSlice"
import AllCurrentOrder from "./AllCurrentOrder"
import { useEffect } from "react"
import { socket } from "../../App"
import { useDispatch } from "react-redux"



export const ChefComp = () => {

  const { userData } = userState()

  const dispatch = useDispatch()



  useEffect(() => {



    // // // Chef events for ntification --------->

    // if (userData.role === "chef") {


    socket.on("chef-order-recived", (res) => {
      console.log(res)
      console.log(res.message)
      dispatch(setNotification(`${res.message}`))
    })


    return () => {
      socket.disconnect();
    };

    // }

  }, [])





  if (userData.role !== "chef") return <Navigate to={"/"} />

  return (
    <>

      <div className=" w-full h-screen ">

        <AllCurrentOrder />

      </div>

    </>
  )
}
