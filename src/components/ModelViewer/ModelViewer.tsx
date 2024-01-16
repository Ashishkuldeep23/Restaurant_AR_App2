
import "@google/model-viewer/lib/model-viewer";
// import "@google/model-viewer";
// import { useEffect } from "react";
import { TypeSingleProduct } from "../../Slices/productSlice"
import "./style.css"
// import { useEffect } from "react";


// import React from 'react'



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
    // export const ModelViewer = () => {


    // useEffect(() => {

    //     // console.log("Log just to avoid err ->",item)

    //     // Dynamically load the model-viewer script
    //     const modelViewerScript = document.createElement('script');
    //     modelViewerScript.type = 'module';
    //     modelViewerScript.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js';
    //     document.head.appendChild(modelViewerScript);

    //     // // Dynamically load the focus-visible script
    //     const focusVisibleScript = document.createElement('script');
    //     focusVisibleScript.src = 'https://unpkg.com/focus-visible/dist/focus-visible.js';
    //     document.head.appendChild(focusVisibleScript);

    //     // Clean up the scripts when the component is unmounted
    //     return () => {
    //         document.head.removeChild(modelViewerScript);
    //         document.head.removeChild(focusVisibleScript);
    //     };
    // }, []);



    // const androidSrc = item.model.src
    const androidSrc = "/models/onion.glb"
    // const iosSrc = item.model.iosSrc ? item.model.iosSrc : "";
    const iosSrc = "/models/onion.usdz";




    return (
        <>


            <model-viewer
                // Size of model is controlled by CSS. 
                // id={`three_D_model`}
                // // src={`./models/${item.name}.glb`}
                // // // // item.model having URL of model ---->
                // src={`${item.model}`}
                // ios-src={`${item.model}`}
                // ar
                // autoplay
                // ar-modes="scene-viewer webxr quick-look"
                // auto-rotate
                // camera-controls
                // alt="3D model"

                // seamless-poster
                // environment-image="neutral"
                // exposure="1.0"
                // interaction-prompt-threshold="0"
                // shadow-intensity="1"
                // camera-orbit="0deg 90deg 0deg 8.37364m"



                // // // src="./models/momo.glb" camera-controls ar-modes="scene-viewer webxr quick-look" ar autoplay 
                // // // Above is used in model show website ---->



                // src={`./models/${item.name}.glb`}
                // // // item.model having URL of model ---->
                id={`${!item.isNonVeg ? "three_D_model_G" : "three_D_model_R"}`}


                // src={`${item.model.src}`}
                // ios-src={`${item.model.iosSrc}`}


                // src={`/models/cake.glb`}
                // ios-src={`models/french.usdz`}

                src={androidSrc}
                iosSrc={iosSrc}

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



                seamless-poster
                environment-image="neutral"
                exposure="1.0"
                interaction-prompt-threshold="0"
                shadow-intensity="1"
                ar
                autoplay
                ar-modes="webxr scene-viewer quick-look"
                auto-rotate
                camera-controls
                camera-orbit="0deg 90deg 0deg 8.37364m"
                alt="3D model"


                
            >




                {/* <div className="poster" slot="poster">
                    <img className="pre-prompt" src="/glb/prompt.svg" />
                </div> */}


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



