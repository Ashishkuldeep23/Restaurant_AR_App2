
import "@google/model-viewer/lib/model-viewer";
// import "@google/model-viewer";
// import { useEffect } from "react";
import { TypeSingleProduct } from "../../Slices/productSlice"
import "./style.css"


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



    // useEffect(() => {
    //     // Dynamically load the model-viewer script
    //     const modelViewerScript = document.createElement('script');
    //     modelViewerScript.type = 'module';
    //     modelViewerScript.src = 'https://unpkg.com/@google/model-viewer';
    //     document.head.appendChild(modelViewerScript);

    //     // Dynamically load the focus-visible script
    //     const focusVisibleScript = document.createElement('script');
    //     focusVisibleScript.src = 'https://unpkg.com/focus-visible/dist/focus-visible.js';
    //     document.head.appendChild(focusVisibleScript);

    //     // Clean up the scripts when the component is unmounted
    //     return () => {
    //         document.head.removeChild(modelViewerScript);
    //         document.head.removeChild(focusVisibleScript);
    //     };
    // }, []);




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
                id={`three_D_model`}
                src={`${item.model}`}
                ios-src={`${item.model}`}
                camera-controls={true}
                ar-modes="scene-viewer webxr quick-look"
                ar={true}
                autoplay={true}
                auto-rotate={true}
                alt="3Dmodel"
                environment-image="neutral"
                exposure="1.0"
                interaction-prompt-threshold="0"
                shadow-intensity="1"
                // camera-orbit="0deg 90deg 0deg 8.37364m"


            >




                {/* <div className="poster" slot="poster">
                    <img className="pre-prompt" src="/glb/prompt.svg" />
                </div> */}


                <div className="progress-bar" slot="progress-bar">
                    <div className="update-bar"></div>
                </div>
                <button slot="ar-button" id="ar-button">
                    View in your space
                </button>
                <div id="ar-prompt">
                    <img src="https://modelviewer.dev/shared-assets/icons/hand.png" />
                </div>



            </model-viewer>

        </>
    )
}



