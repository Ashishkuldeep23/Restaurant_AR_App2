
// import "@google/model-viewer/lib/model-viewer";
import "@google/model-viewer";
import { useEffect } from "react";
import { TypeSingleProduct } from "../../Slices/productSlice"

// import React from 'react'

export const ModelViewer = ({ item, height }: { item: TypeSingleProduct, height?: string }) => {



    useEffect(() => {
        // Dynamically load the model-viewer script
        const modelViewerScript = document.createElement('script');
        modelViewerScript.type = 'module';
        modelViewerScript.src = 'https://unpkg.com/@google/model-viewer';
        document.head.appendChild(modelViewerScript);

        // Dynamically load the focus-visible script
        const focusVisibleScript = document.createElement('script');
        focusVisibleScript.src = 'https://unpkg.com/focus-visible/dist/focus-visible.js';
        document.head.appendChild(focusVisibleScript);

        // Clean up the scripts when the component is unmounted
        return () => {
            document.head.removeChild(modelViewerScript);
            document.head.removeChild(focusVisibleScript);
        };
    }, []);




    return (
        <>


            <model-viewer
                id={`three_D_model${item.name}`}
                // src={`./models/${item.name}.glb`}
                src={`${item.model}`}
                ios-src={`./models/${item.name}.glb`}
                seamless-poster
                environment-image="neutral"
                exposure="1.0"
                interaction-prompt-threshold="0"
                shadow-intensity="1"
                ar
                autoplay
                ar-modes="scene-viewer webxr quick-look"
                auto-rotate
                camera-controls
                camera-orbit="0deg 90deg 0deg 8.37364m"
                alt="3D model"

                style={{ height: `${height || "65vh"}`  , borderRadius: "5px" }}
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



