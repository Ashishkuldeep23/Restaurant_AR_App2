// import React from 'react'

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { AppDispatch } from "../../store"
import { fetchOneProduct, productState } from "../../Slices/productSlice"
import { removerUnderScore } from "../All_products/Single_product"
import { ModelViewer } from "../ModelViewer/ModelViewer"
import QRCodeGenerator from "../QrGenerator/QrGenerator"
import './style.css'


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


        // // // Scroll window ---->

        window.scroll(0 , 0)

    }, [])




    return (
        <>
            <div className="flex flex-col justify-center items-center text-center rounded mx-1 my-5 pb-24">


                {/* md is breakpoint for leptop and mobile ----> */}

                <div className=" border rounded flex justify-between items-center flex-col md:flex-row  w-10/12 md:w-4/5">

                    <ModelViewer item={item} height={"70vh"} />

                    <div className=" md:w-1/4 flex items-center justify-center flex-col-reverse md:flex-col">


                        {/* Generate qr --> */}
                        <div className="my-4 py-4 border-t md:border-b md:border-t-0 ">

                            <p className=" mb-1.5">Scan QR👇</p>

                            <QRCodeGenerator />

                        </div>


                        <div>

                            {/* Starts div --> */}

                            <div>
                                <p className=" my-1 text-xs shadow-lg inline-flex px-1 py-0.5 rounded-md">⭐⭐⭐⭐⭐</p>
                            </div>

                            {/* Discription div --> */}
                            <div >

                                {/* item name div */}
                                <div className="flex justify-center items-center flex-wrap flex-row md:flex-col my-2">
                                    <p className="font-bold uppercase">Dummy</p>

                                    <p className=" md:my-2 px-1 mx-2 uppercase text-xl font-bold border-t  border-2 rounded-lg border-green-400  shadow-lg  hover:scale-110 transition-all">{removerUnderScore(item.name)}</p>

                                    <p className="font-bold uppercase">Dummy</p>
                                </div>
                                {/* <Link to={`/product/${item.id}`}> */}
                                {/* <button
                                        className="border my-1 px-4 rounded font-bold text-white bg-blue-600 hover:bg-blue-400"
                                            >Product details</button> */}
                                {/* </Link> */}
                                {/* <p style={{ lineBreak: "anywhere" }} >{item.description}</p> */}


                                {/* Pice div */}
                                <div>

                                    <p className="bg-orange-400 inline-flex px-4 py-1 rounded shadow-md text-white border font-bold  font-serif hover:scale-x-125 hover:scale-y-110 hover:cursor-pointer transition-all"> <span className=" text-xs">₹</span>{item.price || '200'} ADD</p>

                                </div>

                                {/* <p>Some details</p> */}

                            </div>

                        </div>


                    </div>


                </div>



                {/* Goto home BTn not Using now */}
                {/* <Link to={"/"}>
                    <button
                        className="border rounded px-4 text-2xl font-bold bg-yellow-500 text-white my-5"
                    >
                        Goto Home 🏠
                    </button>
                </Link> */}




                {/* Footer of page details */}

                <div className=" w-full py-1.5 bg-slate-100 fixed bottom-0 flex justify-center">



                    <div className=" w-full md:w-2/4 relative">

                        {/* Gas logo ----> */}
                        <div className="gas_box absolute right-2  scale-75 ">
                            <div className="group">
                                <div className="overlap-group">
                                    <div className="rectangle" />
                                    <div className="div" />
                                    <div className="rectangle-2" />
                                    <div className="rectangle-3" />
                                    <img className="vector" alt="Vector" src="/images/vector-1.svg" />
                                </div>
                            </div>
                        </div>

                        {/* items name  */}
                        <div className="flex">
                            <p className=" capitalize px-1.5"><span className="text-xl font-medium font-serif">P</span>izza</p>
                            <p className=" capitalize px-1.5"><span className="text-xl font-medium font-serif">P</span>aneer</p>
                            <p className=" capitalize px-1.5"><span className="text-xl font-medium font-serif">B</span>uttor</p>
                            <p className=" capitalize px-1.5"><span className="text-xl font-medium font-serif">R</span>oti</p>
                            <p className=" capitalize px-1.5"><span className="text-xl font-medium font-serif">R</span>ice</p>
                        </div>


                        {/* Send order with bill div */}
                        <div className="">

                            <p className=" text-center font-bold">Send Order to Kitchen</p>

                            <div className="flex justify-around md:justify-center">
                                <button className="rounded bg-yellow-400 px-3 uppercase font-semibold text-md mx-1">VIEW BILL</button>
                                <button className="rounded bg-yellow-400 px-3 uppercase font-semibold text-md mx-1">MENU CARD</button>
                            </div>

                        </div>

                    </div>


                </div>


            </div>


        </>
    )
}

export default ProductDetail