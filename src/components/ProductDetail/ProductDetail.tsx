// import React from 'react'

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { AppDispatch } from "../../store"
import { fetchOneProduct, productState } from "../../Slices/productSlice"
import { removerUnderScore } from "../All_products/Single_product"
import { ModelViewer } from "../ModelViewer/ModelViewer"



interface ModelViewerJSX {
    src: string;
    poster?: string;
    iosSrc?: string;
    seamlessPoster?: boolean;
    autoplay?: boolean;
    environmentImage?: string;
    exposure?: string;
    interactionPromptThreshold?: string;
    shadowIntensity?: string;
    ar?: boolean;
    arModes?: string;
    autoRotate?: boolean;
    cameraControls?: boolean;
    cameraOrbit?: string;
    alt?: string;
    sx?: any;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": ModelViewerJSX &
            React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}



const ProductDetail = () => {

    const item = productState().singleProduct

    const params = useParams()

    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {


        const { id } = params


        // console.log(id)

        if (id) {

            dispatch(fetchOneProduct(id))
        } else {
            alert("ID not getting from url bar.")
        }

    }, [])




    return (
        <>
            <div className="flex flex-col justify-center items-center text-center rounded mx-1 my-5 ">


                <div className=" border rounded flex justify-between items-center flex-col sm:flex-row  w-11/12  sm:w-4/5">



                    <ModelViewer item={item} height={"85vh"} />



                    <div className=" sm:w-1/4">



                        <p className=" capitalize font-bold border-t">{removerUnderScore(item.name)}</p>

                        {/* <Link to={`/product/${item.id}`}> */}
                        {/* <button
                        className="border my-1 px-4 rounded font-bold text-white bg-blue-600 hover:bg-blue-400"
                    >Product details</button> */}
                        {/* </Link> */}
                        {/* <p style={{ lineBreak: "anywhere" }} >{item.description}</p> */}



                        <p>Some details</p>

                    </div>


                </div>


                    {/* Goto home BTn */}
                        <Link to={"/"}>
                        <button 
                        className="border rounded px-4 text-2xl font-bold bg-yellow-500 text-white my-5"
                    >
                        Goto Home 🏠
                    </button>
                        </Link>


            </div>


        </>
    )
}

export default ProductDetail