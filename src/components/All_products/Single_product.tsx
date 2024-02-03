// import React from 'react'

import { TypeSingleProduct } from "../../Slices/productSlice";
import { Link } from "react-router-dom";
import { ModelViewer } from "../ModelViewer/ModelViewer";
// import 'focus-visible';




export function removerUnderScore(name: string) {

    // // // This code will replace _ with one sapce only ----->
    return name.replace("-", " ")
}




export const Single_Product = ({ item }: { item: TypeSingleProduct }) => {


    return (
        <>

            <div className="border bg-white  border-white rounded mx-1 my-16 sm:w-96 w-72">


                {/* <model-viewer
                    src="/models/pizza.glb"
                    // alt="A 3D model"
                    // auto-rotate
                    // camera-controls
                ></model-viewer> */}


                <ModelViewer item={item} />


                <p className=" capitalize font-bold border-t">{removerUnderScore(item.name)}</p>

                <Link to={`/product/${item.id}`}>
                    <button
                        className="border my-1 px-4 rounded font-bold text-white bg-blue-600 hover:bg-blue-400"
                    >Product details</button>
                </Link>
                {/* <p style={{ lineBreak: "anywhere" }} >{item.description}</p> */}

            </div>

        </>
    )
}
