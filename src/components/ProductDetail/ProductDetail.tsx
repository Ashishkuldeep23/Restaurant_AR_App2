import './style.css'
import { Fragment, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { AppDispatch } from "../../store"
import { TypeCustomizationsObj, TypeSingleProduct, fetchAllProduct, fetchOneProduct, productState } from "../../Slices/productSlice"
import { removerUnderScore } from "../All_products/Single_product"
import { ModelViewer } from "../ModelViewer/ModelViewer"
import QRCodeGenerator from "../QrGenerator/QrGenerator"
import { setChildrenModal, setOpenMoadl } from "../../Slices/ModalSlice"
import { CardDataInter, addItemInCart, cartState, setItemsClicked } from "../../Slices/cartSlice"
import { v4 as uuid } from 'uuid';



const ProductDetail = () => {

    const navigate = useNavigate()

    const item = productState().currenProduct

    const isLoading = productState().isLoading


    const { cartData } = cartState()


    const params = useParams()

    const dispatch = useDispatch<AppDispatch>()


    // // // This var is only used to show when used click to add into cart -->
    const [showSizingPart, setShowSizingPart] = useState(false)


    // // // cart variables starts here --->
    const [choossenCustomizations, setChoossenCustomizations] = useState<TypeCustomizationsObj>({ sizes: [], crusts: [] })


    type SelectedType = {
        sizes: number, crusts: number
    }

    const [selectedIndex, setSelectedIndex] = useState<SelectedType>({ sizes: 0, crusts: -1 })

    const [totalPriceOfItem, setTotalPriceOfItem] = useState(item.price)

    const [quantityOfProduct, setQuantityOfProduct] = useState<number>(1)


    function customizeClickHandler(key: string, name: string, additionalPrice: number, i: number) {

        // console.log(key, name, additionalPrice)

        // // // Set choossenCustomizations OBJ after click read --->
        setChoossenCustomizations({ ...choossenCustomizations, [key]: [{ name: name, additionalPrice: additionalPrice }] })

        // selectedIndex


        // // // Here set Index Number according to fiels click ---->

        setSelectedIndex({ ...selectedIndex, [key]: i })

        // if (key === "sizes") {
        //     setSelectedIndex({ ...selectedIndex, sizes: i })
        // }

        // if (key === "crusts") {
        //     setSelectedIndex({ ...selectedIndex, crusts: i })

        // }

    }



    function addToCartHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        e.stopPropagation()


        // console.log(choossenCustomizations)



        if (choossenCustomizations.sizes.length === 0 && choossenCustomizations.crusts.length === 0) {

            return alert("Choose something first ---->")
        }



        const { id, name, category, model, isNonVeg } = item

        let sendCartData: CardDataInter = { id, name, category, model, isNonVeg: isNonVeg || false, customizations: choossenCustomizations, quantity: quantityOfProduct, price: totalPriceOfItem }

        dispatch(addItemInCart(sendCartData))


        // // // BACK TO NORMAL ( cart states ) ---->
        // setChoossenCustomizations()

        const nameOfSize = item.customizations?.sizes[0]?.name || ''
        const additionalPriceOfSize = item.customizations?.sizes[0]?.additionalPrice || 0


        if (nameOfSize || additionalPriceOfSize) {

            setChoossenCustomizations({ sizes: [{ name: nameOfSize, additionalPrice: additionalPriceOfSize }], crusts: [] })

        }


        setSelectedIndex({ sizes: 0, crusts: -1 })
        setTotalPriceOfItem(item.price)
        setQuantityOfProduct(1)

    }



    function cartItemsNameFormate(name: string) {

        return <><span className=" text-xl font-medium font-serif">{name[0]}</span><span>{name.substring(1)}</span></>

    }



    // // Update total price of item ---->
    useEffect(() => {

        if (choossenCustomizations.sizes.length !== 0 || choossenCustomizations.crusts.length !== 0) {
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

            for (let key in choossenCustomizations) {
                // console.log(key)

                let value = choossenCustomizations[key as keyof TypeCustomizationsObj]

                if (value.length > 0) {
                    allAdditionalPrice += +value[0]?.additionalPrice
                }

            }

            // console.log(allAdditionalPrice)

            setTotalPriceOfItem(item.price + +allAdditionalPrice)

        }

    }, [choossenCustomizations])



    // // // set the new price on refresh -->
    useEffect(() => {
        // console.log(item)


        // // // Updating Price ---->
        if (item.customizations?.sizes[0]) {
            setTotalPriceOfItem(item.customizations?.sizes[0].additionalPrice + item.price)
        } else {
            setTotalPriceOfItem(item.price)
        }





        if (item?.customizations?.sizes.length !== 0 && item?.customizations?.crusts.length !== 0) {

            // // // Update choosenCat obj --->
            const nameOfSize = item.customizations?.sizes[0]?.name || ''

            const additionalPriceOfSize = item.customizations?.sizes[0]?.additionalPrice || 0


            if (nameOfSize || additionalPriceOfSize) {

                // setChoossenCustomizations({ ...choossenCustomizations, sizes: [{ name: nameOfSize, additionalPrice: additionalPriceOfSize }] })


                setChoossenCustomizations({ crusts: [], sizes: [{ name: nameOfSize, additionalPrice: additionalPriceOfSize }] })


                // //  update index also ---->
                setSelectedIndex({ sizes: 0, crusts: -1 })
            }

        } else {

            setChoossenCustomizations({ sizes: [], crusts: [] })
        }


    }, [item])



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

            {/** Loading component ---->  */}

            <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 z-10">
                {
                    isLoading
                    &&
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-20 h-20  text-gray-200 animate-spin fill-red-600 opacity-100 " viewBox="0 0 100 101" fill="none" >
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                }
            </div>


            <div className="flex flex-col justify-center items-center text-center rounded mx-1 my-5 pb-24">


                {/* md is breakpoint for leptop and mobile ----> */}

                <div className=" mt-5 border rounded flex justify-between items-center flex-col md:flex-row w-full md:w-4/5">

                    <ModelViewer item={item} />

                    <div className=" w-full md:w-1/4 flex items-center justify-center flex-col-reverse md:flex-col">


                        {/* Generate qr --> */}
                        <div className="my-4 py-4 border-t md:border-b md:border-t-0 ">

                            <p className=" mb-1.5">Scan QR👇</p>

                            <QRCodeGenerator />

                        </div>

                        {/* Main UI with details --> */}
                        <div className="w-full md:h-60  md:overflow-y-scroll">


                            {/* Here give the toggel UI (Var) */}
                            {
                                !showSizingPart

                                    ?

                                    // // // Default this will visiable --->
                                    <div>

                                        {/* Starts div --> */}
                                        <div>
                                            <p className=" my-1 text-xs shadow-lg inline-flex px-1 py-0.5 rounded-md">⭐⭐⭐⭐⭐</p>
                                        </div>

                                        {/* Discription div --> */}
                                        <div >

                                            {/* item name div with all styles  */}

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
                                                > <span className=" text-xs">₹</span>{totalPriceOfItem || '000'} ADD</p>

                                            </div>

                                            {/* <p>Some details</p> */}

                                        </div>

                                    </div>

                                    :

                                    // // // Once user click add then show the option and all --->
                                    <div className=" relative w-full px-2 my-3  bg-gray-200 text-start">

                                        <button
                                            className=" absolute -top-6 left-0 border-2 bg-white mt-1 p-1 rounded-full"
                                            onClick={() => { setShowSizingPart(!showSizingPart) }}
                                        >🔙</button>


                                        {/* <p>Selected option : {JSON.stringify(choossenCustomizations)}</p> */}
                                        <p className=" text-center  font-semibold capitalize"><span>{choossenCustomizations?.sizes[0]?.name}</span>/<span>{choossenCustomizations?.crusts[0]?.name}</span> </p>
                                        <p className="font-semibold text-center">Total Pric of item : ₹{totalPriceOfItem}</p>


                                        {
                                            item.customizations
                                            &&
                                            Object.keys(item?.customizations).map((ele) => {
                                                return <div key={uuid()} className=" my-2  rounded w-full  bg-white shadow-md shadow-gray-700">

                                                    {/* Heading --> */}
                                                    <p className=" px-1 flex flex-col border-b-2 border-gray-200 relative">
                                                        <span className="text-xl capitalize">{ele}</span>
                                                        {/* <span className="text-xs capitalize">Select one</span> */}


                                                        {

                                                            ele === "sizes"
                                                                ?

                                                                choossenCustomizations?.sizes?.length <= 0
                                                                &&
                                                                <span className="text-xs capitalize">Select one</span>

                                                                // <span className=" absolute right-2 bottom-2 capitalize">{choossenCustomizations?.sizes[0]?.name}</span>

                                                                :
                                                                choossenCustomizations?.crusts?.length <= 0
                                                                &&
                                                                <span className="text-xs capitalize">Select one</span>

                                                        }


                                                        {

                                                            ele === "sizes"
                                                                ?

                                                                <span className=" absolute right-2 bottom-0 capitalize">{choossenCustomizations?.sizes[0]?.name}</span>

                                                                :
                                                                <span className="absolute right-2 bottom-0 ">
                                                                    <span className=" capitalize">{choossenCustomizations?.crusts[0]?.name}</span>

                                                                    {
                                                                        choossenCustomizations?.crusts[0]?.name
                                                                        &&
                                                                        <span
                                                                            // // // remove crusts (Back to normal here ) --->
                                                                            onClick={(e) => { e.stopPropagation(); setSelectedIndex({ ...selectedIndex, crusts: -1 }); setChoossenCustomizations({ ...choossenCustomizations, crusts: [] }) }}
                                                                            className=" ml-3 px-1 rounded font-bold text-white bg-red-500 hover:bg-red-300"
                                                                        >X</span>
                                                                    }

                                                                </span>

                                                        }


                                                    </p>

                                                    {/* Alll Avilable option will shown here --> */}
                                                    <div className=" px-10 flex justify-evenly">
                                                        {/* Options map on given arr */}

                                                        {

                                                            item?.customizations
                                                                &&

                                                                item?.customizations[ele as keyof TypeCustomizationsObj].length > 0
                                                                ?
                                                                item?.customizations[ele as keyof TypeCustomizationsObj].map((el, i) => {
                                                                    return <div
                                                                        key={uuid()}
                                                                        className={` text-center ${ele === "sizes" ? (i === selectedIndex.sizes) && "text-orange-400" : (i === selectedIndex.crusts) && "text-orange-400"}  `}
                                                                        onClick={() => { customizeClickHandler(ele, el.name, el.additionalPrice, i) }}
                                                                    >
                                                                        <p className="capitalize px-0.5">{el.name || "Regular"}</p>
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
                                                                        <p className="px-0.5">DRegular</p>
                                                                        <p className=" font-serif  font-bold"> <span className=" text-sm">₹</span>99</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="px-0.5">DMedium</p>
                                                                        <p className=" font-serif  font-bold"> <span className=" text-sm">₹</span>199</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="px-0.5">DLarge</p>
                                                                        <p className=" font-serif  font-bold"> <span className=" text-sm">₹</span>299</p>
                                                                    </div>
                                                                </>


                                                        }



                                                    </div>

                                                </div>
                                            })

                                        }


                                        {/* Add to cart main button */}

                                        <div className=" bg-white px-1 py-1.5 mt-4 rounded flex justify-around items-start">
                                            <div className=" bg-orange-200 w-20 mx-0.5 rounded flex justify-around font-bold">
                                                <span
                                                    className="text-red-500  rounded px-0.5 active:bg-red-500 active:text-black hover:cursor-pointer"

                                                    onClick={() => { quantityOfProduct > 1 && setQuantityOfProduct(quantityOfProduct - 1) }}

                                                >-</span>
                                                <span>{quantityOfProduct}</span>
                                                <span
                                                    className="text-red-500 rounded px-0.5 active:bg-red-500 active:text-black hover:cursor-pointer"
                                                    onClick={() => setQuantityOfProduct(quantityOfProduct + 1)}
                                                >+</span>

                                            </div>

                                            <div>

                                                <button
                                                    className=" bg-orange-400 text-white mx-0.5 font-serif font-semibold px-2 rounded "
                                                    onClick={(e) => { addToCartHandler(e) }}
                                                >Add to Table ₹{totalPriceOfItem * quantityOfProduct}</button>
                                            </div>
                                        </div>

                                    </div>
                            }
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


                        {/* Cart items name  */}
                        <div className="flex overflow-y-auto w-10/12 sm:w-11/12">



                            {

                                cartData.length > 0
                                    ?
                                    <>

                                        {
                                            cartData.map((ele , i) => {
                                                return <p
                                                    className=" mx-0.5 border border-black rounded capitalize px-1.5 hover:cursor-pointer"
                                                    key={uuid()}
                                                    onClick={()=>{navigate("/billing"); dispatch(setItemsClicked(i))}}
                                                >{cartItemsNameFormate(ele.name)}</p>
                                            })
                                        }

                                    </>

                                    :

                                    <>
                                        <p className="mx-0.5 border border-black rounded capitalize px-1.5"><span className="text-xl font-medium font-serif">P</span>izza</p>
                                        <p className="mx-0.5 border border-black rounded capitalize px-1.5"><span className="text-xl font-medium font-serif">P</span>aneer</p>
                                        <p className="mx-0.5 border border-black rounded capitalize px-1.5"><span className="text-xl font-medium font-serif">R</span>oti</p>
                                        {/* <p className=" capitalize px-1.5"><span className="text-xl font-medium font-serif">B</span>uttor</p> */}
                                        {/* <p className=" capitalize px-1.5"><span className="text-xl font-medium font-serif">R</span>ice</p> */}
                                        <p className=" mx-0.5 border border-black rounded capitalize px-1.5"><span className="text-xl font-medium font-serif">D</span>uumy</p>
                                        <p className=" mx-0.5 border border-black rounded capitalize px-1.5"><span className="text-xl font-medium font-serif">C</span>art</p>
                                    </>

                            }

                        </div>


                        {/* Send order with bill div */}
                        <div className="">

                            <p className=" text-center font-bold">Send Order to Kitchen</p>

                            <div className="flex justify-around md:justify-center">



                                <button
                                    className="rounded bg-yellow-400 px-3 uppercase font-semibold text-md mx-1 relative"
                                    onClick={() => { 
                                        (cartData.length > 0) ? navigate("/billing") : alert("Add item for billing.");

                                        dispatch(setItemsClicked(-1))
                                    }}
                                >
                                    {
                                        cartData.length > 0
                                        &&
                                        <span className=" bg-red-500 px-0.5 text-white absolute rounded-full -top-2 -left-1.5">{cartData.length}</span>
                                    }
                                    VIEW BILL</button>


                                {/* here create a menu btn component with all logics ---> */}
                                <MenuWithLogic setShowSizingPart={setShowSizingPart} />

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


                {

                    sameCatProducts.map((ele) => {


                        return (
                            <Fragment key={ele.id}>{

                                (item.name === ele.name)
                                    ?
                                    <p
                                        className={` animate__animated  animate__bounce  md:my-2 px-1 mx-2 uppercase text-xl font-bold   border-2 border-b-4 rounded-lg shadow-lg  hover:scale-110 transition-all ${!item?.isNonVeg ? "border-green-400 " : "border-red-600 "} hover:cursor-pointer `}
                                    >{removerUnderScore(item.name)}</p>
                                    :
                                    <p
                                        key={ele.id}
                                        className="font-bold uppercase px-2 hover:cursor-pointer hover:border rounded"
                                        onClick={() => { dispatch(fetchOneProduct(ele.id)); navigate(`/product/${ele.id}`) }}
                                    >{ele.name || "item"}</p>


                            }</Fragment>
                        )
                    })
                }


                {/* <p className="font-bold uppercase">Dummy</p> */}
            </div>
        </>

    )

}




function MenuWithLogic({ setShowSizingPart }: { setShowSizingPart: React.Dispatch<React.SetStateAction<boolean>> }) {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const allProductData = productState().allProroductData
    const item = productState().currenProduct


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

        // console.log(groupByData)


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





    return (
        <>
            <button
                onClick={(e) => { menuClickHandler(e) }}
                className="rounded bg-yellow-400 px-3 uppercase font-semibold text-md mx-1"
            >MENU CARD</button>
        </>
    )

}


