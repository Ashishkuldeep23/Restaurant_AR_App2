
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


/**
 * MODELS PROBLEMS WITH SOLUTION ----->
 * 1) So problem was with IOS -> not using correct version of model viewer use latest version of model veiwer (provide @ latest during download ).
 * 2) import model viewer from '@google/model-viewer/lib/model-viewer.
 * 3) Don't use any useEffcet to attach CDN link insted of use package of model viewer.
 * 4) For IOS you have to give usdz model file path in ios-src and give quick-look in ar-model atteribute.
 * 5) Model should have good quality.
*/




interface ModelViewerJSX {
    src: string;
    poster?: string;
    iosSrc?: string;
    "ios-src"?:string;
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


                // // // Models by URL
                src={`${item.model.src}`}
                // ios-src={`${item.model.iosSrc}`}
                ios-src={`/models/${item.name}.usdz`}

                

                // // // Loacl Models 
                // src={`/models/onion.glb`}
                // ios-src={`/models/a3.usdz`}

                poster="/images/s.png"

                // environment-image="neutral"
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
                camera-orbit="60deg 55deg 0deg 1.37364m"
                alt="3D model"

            >


                <div className="poster" slot="poster">
                    <img className="pre-prompt" src="/glb/prompt.svg" />
                </div>


                <div className="progress-bar" slot="progress-bar">
                    <div className="update-bar"></div>
                </div>
                <button slot="ar-button" id="ar-button">
                    View <span className=" capitalize font-semibold">{item.name}</span> in your space
                </button>
                <div id="ar-prompt">
                    <img src="https://modelviewer.dev/shared-assets/icons/hand.png" />
                </div>



            </model-viewer>

        </>
    )
}



