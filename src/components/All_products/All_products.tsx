
// import React from 'react'

import { useEffect } from "react"
import { Single_Product } from "./Single_product"
import { fetchAllProduct, productState, setCurentProduct } from "../../Slices/productSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { useLocation, useNavigate } from "react-router-dom"
import { LoaderCircle } from "../LoaderCircle/LoaderCircle"






const All_products = () => {

    const navgate = useNavigate()

    const isLoading = productState().isLoading

    const allProductData = productState().allProroductData

    const dispatch = useDispatch<AppDispatch>()

    const location = useLocation()



    // console.log(allProductData)


    useEffect(() => {

        // // Getting all products from backend ----->
        dispatch(fetchAllProduct())

        // getallProductData()

    }, [])


    // // // set first product ----->
    // console.log(location)

    useEffect(() => {


        // // // Below code will always redirect in product showcase page, based on default product ---->
        // // // But i don't want this (When user present on home page then only redirect into product show case page)

        if (allProductData.length > 0) {
            setCurentProduct(allProductData[0])

            // // Now navigate to product show page 
            // // TODO : Change the logic after ---->

            // // BeDefaul sending on first page ---->

            // console.log(location)
            console.log(location.pathname)

            if (location.pathname === "/") {
                // console.log("fuck............")
                navgate(`/product/${allProductData[0].id}`)
            }

        }

    }, [allProductData])



    return (
        <>




            <LoaderCircle isLoading={isLoading} />


            <div
                // style={{ minHeight: "100vh", width: "100vw" }}
                className=" bg-themeColor py-10 px-1 text-center flex flex-col items-center relative"
            >



                <div className="text-xl font-bold underline text-white">
                    All product will visiable in AR
                </div>

                <div className=" flex flex-wrap justify-evenly">
                    {
                        allProductData.length > 0
                            ?

                            allProductData.map((ele, i) => {
                                return (
                                    <Single_Product key={i} item={ele} />
                                )
                            })

                            : <p>No Product found</p>
                    }
                </div>


            </div>



        </>
    )
}

export default All_products

