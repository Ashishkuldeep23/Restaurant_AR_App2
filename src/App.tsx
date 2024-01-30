import { HomePage } from "./Screens/HomePage"
import { Routes, Route, Link } from "react-router-dom"
import LoginScreen from "./Screens/LoginScreen"
import GoogleSuccessPage from "./components/Login/GoogleSuccessPage"
import { useEffect } from "react"
import { ProductDetailScreen } from "./Screens/ProductDetailScreen"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./store"
import { getUserDataWithToken, setNotification } from "./Slices/userSlice"
import Modal from "./components/Modal/Modal"
import { BillingPage } from "./Screens/BillingPage"
import { cartState, loadCartData } from "./Slices/cartSlice"
// import { ChefPage } from "./Screens/ChefPage"
import { UserPage } from "./Screens/UserPage"
import { ChefPage } from "./Screens/ChefPage"
import { CurrentOrder } from "./Screens/CurrentOrder"


import io from 'socket.io-client';



// // fn write to check only based on this ---> calling fetch user ---> in LocalHost also -->
export const gettingTokenInCookieAndLocalHost = () => {


  // // // Token var will load actual token --->
  let token: any = false;


  let checkInCookie = document.cookie
  let allCookies = checkInCookie.split(";")

  // console.log("token")


  for (let cookie of allCookies) {

    if (cookie.includes("token")) {

      let tokenArr = cookie.split("=")

      let actualToken = tokenArr[1]

      token = actualToken


      // console.log(token)


      break

    }

  }


  return token
}


// // // // Connection for socket io (providing extra info after comma to avoid CORS err)
// // // This socket io i'll use to send and recive notification ---->
export const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, { transports: ['websocket'] }); // Replace with your server URL



function App() {


  const dispatch = useDispatch<AppDispatch>()

  const { cartData } = cartState()



  useEffect(() => {

    // console.log("Call dispatch for home page ---->")

    // // // Calling user data if user login -->
    let checkToken = gettingTokenInCookieAndLocalHost()

    if (checkToken) {
      dispatch(getUserDataWithToken(checkToken))
    }



    // // // Load Cart data in slice --->
    let getCartDataFromLoacl = localStorage.getItem("AR_Cart")
    if (getCartDataFromLoacl) {
      dispatch(loadCartData(JSON.parse(getCartDataFromLoacl)))
    }

  }, [])


  // // // setting Cart data into backend ----------------->
  useEffect(() => {
    // if (cartData.length !== 0) {
    localStorage.setItem("AR_Cart", JSON.stringify(cartData))
    // }

  }, [cartData])



  // // // Socket IO connection code ---->

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server. 😊');
    });



    socket.on("chef-order-recived", (res) => {
      // console.log(res)
      // console.log(res.message)
      dispatch(setNotification(`${res.message}`))
    })


    return () => {
      socket.disconnect();
    };
  }, []);



  return (

    <>

      {/* Not working for now -----> */}
      {/* <button className=" relative z-50 px-5 py-1 bg-red-500  rounded mx-5 my-1">Send Message</button> */}

      {/* Above from routes will avilable for all pages ---> */}
      < Modal />


      <Routes >

        <Route
          path="/"
          element={<HomePage />}
        />


        <Route
          path="/login"
          element={<LoginScreen />}
        />

        <Route
          path="/user-login/:token/newuser"
          element={<GoogleSuccessPage />}
        />


        <Route
          path="/product/:id"
          element={<ProductDetailScreen />}

        />


        <Route
          path="/billing"
          element={<BillingPage />}
        />


        <Route
          path="/profile"
          element={<UserPage />}
        />

        <Route
          path="/chef-page"
          element={<ChefPage />}
        />


        <Route
          path="/current-order"
          element={<CurrentOrder />}
        />



        {/* Not found Page ------> */}
        <Route
          path="*"
          element={
            <>
              <div
                style={{ height: "99vh" }}
                className=" flex flex-col justify-center items-center "
              >
                <h1 className=" text-center text-3xl text-red-500">Page not Found, Go to Home please.</h1>
                <Link to="/"><button className="border my-3 rounded text-white bg-green-500 px-2">GoTo Home 🏠</button></Link>
              </div>
            </>
          }
        />



      </Routes>

    </>

  )
}

export default App
