
import "@google/model-viewer/lib/model-viewer";
// import "@google/model-viewer";
// import { useEffect } from "react";
import { TypeSingleProduct } from "../../Slices/productSlice"
import "./style.css"
// import { useEffect, useState } from "react";
// import { useEffect } from "react";


// import React from 'react'


/**
 * used arttibutes --->
 *                 // src={androidSrc}
                // iosSrc={iosSrc}
                // ar-modes="webxr scene-viewer quick-look"
                // interaction-prompt-threshold="0"
                // alt="3Dmodel"
                // environment-image="neutral"
                // exposure="1.0"
                // shadow-intensity="1.1"
                // // // // Gihub code ---->
                // ar-scale="fixed"
                // camera-controls
                // autoplay
                // seamless-poster
                // ar
                // auto-rotate
                // camera-orbit="0deg 65deg 0deg 1m"

 */





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





export const ModelViewer = ({ item }: { item: TypeSingleProduct, height?: string }) => {





    // const androidSrc = item.model.src
    // const androidSrc = "/models/onion.glb"
    // const iosSrc = item.model.iosSrc ? item.model.iosSrc : "";
    // const iosSrc = "/models/xyz.usdz";



    // const [androidSrc , setAndroidSrc] = useState("/models/onion.glb")
    // const [iosSrc , setIosSrc] = useState("/models/a1.usdz")



    // useEffect(()=>{ 

    //     // // // set model sorces both --->
    //     setAndroidSrc("");
    //     setIosSrc("/models/a2.usdz");

    // } , [item])





    return (
        <>


            <model-viewer
               
               



                // src={`./models/${item.name}.glb`}
                // // // item.model having URL of model ---->
                id={`${!item.isNonVeg ? "three_D_model_G" : "three_D_model_R"}`}


                // src={`${item.model.src}`}
                // ios-src={`${item.model.iosSrc}`}


                src={`/models/onion.glb`}
                // ios-src={`/models/a3.usdz`}

                environment-image="neutral"
                exposure="1.0"
                interaction-prompt-threshold="0"
                seamless-poster
                shadow-intensity="1.0"
                ar
                autoplay

                
                ar-scale="fixed"
                xr-environment
                // ar-modes="scene-viewer webxr quick-look"
                ar-modes="scene-viewer webxr quick-look"
                auto-rotate
                camera-controls
                camera-orbit="0deg 90deg 0deg 8.37364m"
                alt="3D model"

            >




                <div className="poster" slot="poster">
                    <img className="pre-prompt" src="/glb/prompt.svg" />
                </div>


                <div className="progress-bar" slot="progress-bar">
                    <div className="update-bar"></div>
                </div>
                <button slot="ar-button" id="ar-button">
                    View <span className=" capitalize">{item.name}</span> in your space
                </button>
                <div id="ar-prompt">
                    <img src="https://modelviewer.dev/shared-assets/icons/hand.png" />
                </div>



            </model-viewer>

        </>
    )
}



