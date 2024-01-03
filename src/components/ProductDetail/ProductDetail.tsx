// import React from 'react'

import { Fragment, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { AppDispatch } from "../../store"
import { TypeCustomizationsObj, TypeSingleProduct, fetchAllProduct, fetchOneProduct, productState } from "../../Slices/productSlice"
import { removerUnderScore } from "../All_products/Single_product"
import { ModelViewer } from "../ModelViewer/ModelViewer"
import QRCodeGenerator from "../QrGenerator/QrGenerator"
import './style.css'
import { setChildrenModal, setOpenMoadl } from "../../Slices/ModalSlice"


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

    const navigate = useNavigate()

    const item = productState().currenProduct

    const params = useParams()

    const dispatch = useDispatch<AppDispatch>()

    const allProductData = productState().allProroductData

    const [showSizingPart, setShowSizingPart] = useState(false)

    const [choossenCustomizations, setChoossenCustomizations] = useState<TypeCustomizationsObj>({ sizes: [], crusts: [] })

    const [totalPriceOfItem , setTotalPriceOfItem] = useState(item.price)



    function menuClickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        e.stopPropagation();

        // alert()


        const groupByData: any = {}

        for (let item of allProductData) {
            // console.log(item)

            if (!groupByData[item.category]) {
                groupByData[item.category] = [item]
            } else {
                groupByData[item.category].push(item)
            }

        }



        function categoryClickHandler(category: string) {

            // console.log(category)
            // alert()


            for (let key in groupByData) {


                if (category === key) {

                    // console.log(groupByData[key][0])


                    // // // Now set state of current product/dispatch the product  and also navigate to page ---->

                    let firstProductIdOfCategory = groupByData[key][0].id

                    dispatch(fetchOneProduct(firstProductIdOfCategory))

                    navigate(`/product/${firstProductIdOfCategory}`)

                    dispatch(setOpenMoadl(false))

                    break

                }


            }


        }




        let innerHTML = <div>

            <ul>

                {
                    Object.keys(groupByData).map((ele, i) => {
                        return (
                            <li
                                key={i}
                                className={`capitalize font-bold flex justify-between items-center my-5 text-xl ${(item.category === ele) && 'text-yellow-400'}`}
                                onClick={() => { categoryClickHandler(ele); setShowSizingPart(false) }}
                            >
                                <span className="px-2 w-full text-center" >{ele}</span>
                                <span>{groupByData[ele].length}</span>
                            </li>
                        )
                    })
                }

            </ul>

        </div>

        dispatch(setOpenMoadl(true))
        dispatch(setChildrenModal(innerHTML))

    }



    function customizeClickHandler(key: string, name: string, additionalPrice: number) {

        // console.log(key, name, additionalPrice)

        setChoossenCustomizations({ ...choossenCustomizations, [key]: [{ name: [name], additionalPrice: [additionalPrice] }] })

    }


    // // Update total price of item ---->
    useEffect(()=>{

        if(choossenCustomizations.sizes.length !== 0 || choossenCustomizations.crusts.length !==0){
            // alert()

            // if(choossenCustomizations.sizes.length > 0){

            //     let add = choossenCustomizations?.sizes[0]?.additionalPrice

            //     setTotalPriceOfItem(item?.price + +(add) + +choossenCustomizations?.crusts[0]?.additionalPrice || 0)
            // }

            // if(choossenCustomizations.crusts.length > 0){

            //     let add = choossenCustomizations?.crusts[0]?.additionalPrice

            //     setTotalPriceOfItem(item?.price + +(add) + +choossenCustomizations?.sizes[0]?.additionalPrice || 0)
            // }



            let allAdditionalPrice = 0;

            for(let key in choossenCustomizations){
                // console.log(key)

                let value = choossenCustomizations[key as keyof TypeCustomizationsObj]

                if(value.length > 0){
                    allAdditionalPrice += +value[0]?.additionalPrice
                }

            }

            // console.log(allAdditionalPrice)

            setTotalPriceOfItem(item.price + +allAdditionalPrice)

        }


    } , [choossenCustomizations])



    // // // set the new price on refresh -->
    useEffect(()=>{
        setTotalPriceOfItem(item.price)
    } ,[item])



    // // // On page refresh code --->
    useEffect(() => {


        const { id } = params

        if (item && !item.name) {



            // console.log(id)

            if (id) {

                // // Get single food -->
                dispatch(fetchOneProduct(id))

                // // Get all foods -->
                dispatch(fetchAllProduct())

            } else {
                alert("ID not getting from url bar.")
            }


            // // // Scroll window ---->

            window.scroll(0, 0)


        }


    }, [])




    return (
        <>
            <div className="flex flex-col justify-center items-center text-center rounded mx-1 my-5 pb-24">


                {/* md is breakpoint for leptop and mobile ----> */}

                <div className=" border rounded flex justify-between items-center flex-col md:flex-row  w-10/12 md:w-4/5">

                    <ModelViewer item={item} height={"70vh"} />

                    <div className=" w-full md:w-1/4 flex items-center justify-center flex-col-reverse md:flex-col">


                        {/* Generate qr --> */}
                        <div className="my-4 py-4 border-t md:border-b md:border-t-0 ">

                            <p className=" mb-1.5">Scan QR👇</p>

                            <QRCodeGenerator />

                        </div>


                        {/* Here give the toggel UI (Var) */}
                        {
                            !showSizingPart

                                ?


                                <div>

                                    {/* Starts div --> */}

                                    <div>
                                        <p className=" my-1 text-xs shadow-lg inline-flex px-1 py-0.5 rounded-md">⭐⭐⭐⭐⭐</p>
                                    </div>

                                    {/* Discription div --> */}
                                    <div >

                                        {/* item name div */}

                                        <NameWithLeftRight />


                                        {/* <Link to={`/product/${item.id}`}> */}
                                        {/* <button
                                        className="border my-1 px-4 rounded font-bold text-white bg-blue-600 hover:bg-blue-400"
                                            >Product details</button> */}
                                        {/* </Link> */}
                                        {/* <p style={{ lineBreak: "anywhere" }} >{item.description}</p> */}


                                        {/* Pice div */}
                                        <div>

                                            <p
                                                className="bg-orange-400 inline-flex px-4 py-1 rounded shadow-md text-white border font-bold  font-serif hover:scale-x-125 hover:scale-y-110 hover:cursor-pointer transition-all"
                                                onClick={() => { setShowSizingPart(!showSizingPart) }}
                                            > <span className=" text-xs">₹</span>{item.price || '200'} ADD</p>

                                        </div>

                                        {/* <p>Some details</p> */}

                                    </div>

                                </div>

                                :

                                <div className=" relative w-full px-2 my-3  bg-gray-200 text-start">

                                    <button
                                        className=" absolute -top-10 left-0 border-2 bg-white mt-1 p-1 rounded-full"
                                        onClick={() => { setShowSizingPart(!showSizingPart) }}
                                    >🔙</button>


                                    <p>Selected option : {JSON.stringify(choossenCustomizations)}</p>
                                    <p>Total Pric of item : ₹{totalPriceOfItem}</p>


                                    {
                                        item.customizations
                                        &&
                                        Object.keys(item?.customizations).map((ele, i) => {
                                            return <div key={i} className=" my-1  rounded w-full  bg-white shadow-xl">

                                                {/* Heading --> */}
                                                <p className=" px-1 flex flex-col border-b-2 border-gray-200">
                                                    <span className="text-xl capitalize">{ele}</span>
                                                    <span className="text-xs capitalize">Select one</span>
                                                </p>

                                                <div className=" px-10 flex justify-evenly">
                                                    {/* Options map on given arr */}

                                                    {

                                                        item?.customizations
                                                            &&

                                                            item?.customizations[ele as keyof TypeCustomizationsObj].length > 0
                                                            ?
                                                            item?.customizations[ele as keyof TypeCustomizationsObj].map((el, i) => {
                                                                return <div
                                                                    className=" text-center"
                                                                    key={i}
                                                                    onClick={() => { customizeClickHandler(ele, el.name, el.additionalPrice) }}
                                                                >
                                                                    <p className="capitalize">{el.name || "Regular"}</p>
                                                                    <p
                                                                        className=" font-serif  font-bold"
                                                                    >
                                                                        <span
                                                                            className=" text-sm"
                                                                        >{(ele === 'sizes') && '₹'}</span>
                                                                        {
                                                                            (ele === 'sizes') ? (item.price + el.additionalPrice) : `+${el.additionalPrice}` || 99
                                                                        }
                                                                    </p>
                                                                </div>
                                                            })

                                                            :
                                                            <>
                                                                {/* I'm dummy data */}
                                                                <div>
                                                                    <p>Regular</p>
                                                                    <p className=" font-serif  font-bold"> <span className=" text-sm">₹</span>99</p>
                                                                </div>
                                                                <div>
                                                                    <p>Medium</p>
                                                                    <p className=" font-serif  font-bold"> <span className=" text-sm">₹</span>199</p>
                                                                </div>
                                                                <div>
                                                                    <p>Large</p>
                                                                    <p className=" font-serif  font-bold"> <span className=" text-sm">₹</span>299</p>
                                                                </div>
                                                            </>


                                                    }



                                                </div>

                                            </div>
                                        })

                                    }


                                </div>
                        }



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
                                <button
                                    className="rounded bg-yellow-400 px-3 uppercase font-semibold text-md mx-1"
                                >VIEW BILL</button>

                                <button
                                    onClick={(e) => { menuClickHandler(e) }}
                                    className="rounded bg-yellow-400 px-3 uppercase font-semibold text-md mx-1"
                                >MENU CARD</button>
                            </div>

                        </div>

                    </div>


                </div>


            </div>


        </>
    )
}

export default ProductDetail





function NameWithLeftRight() {

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()

    const item = productState().currenProduct

    const allProductData = productState().allProroductData

    const [sameCatProducts, setSameCatProducts] = useState<TypeSingleProduct[]>([])




    useEffect(() => {

        if (item.name) {

            let sameCatProduct = allProductData.filter((ele) => { return ele.category === item.category })

            // console.log(sameCatProduct)

            if (sameCatProduct.length > 0) {

                setSameCatProducts(sameCatProduct)
            }

        }


    }, [allProductData, item])



    return (

        <>
            <div className="flex justify-center items-center flex-wrap flex-row md:flex-col my-2">

                <p
                    className={` animate__animated  animate__bounce  md:my-2 px-1 mx-2 uppercase text-xl font-bold   border-2 border-b-4 rounded-lg shadow-lg  hover:scale-110 transition-all ${!item?.isNonVeg ? "border-green-400 " : "border-red-600 "} `}
                >{removerUnderScore(item.name)}</p>


                {
                    sameCatProducts.length > 0
                    &&
                    sameCatProducts.map((ele) => {

                        // // // If simmilar id then show nothing -->
                        if (ele.id === item.id) return <Fragment key={ele.id}></Fragment>

                        return (
                            <p
                                key={ele.id}
                                className="font-bold uppercase px-2"
                                onClick={() => { dispatch(fetchOneProduct(ele.id)); navigate(`/product/${ele.id}`) }}
                            >{ele.name}</p>
                        )
                    })
                }

                {/* <p className="font-bold uppercase">Dummy</p> */}
            </div>
        </>

    )

}




