import { HomePage } from "./Screens/HomePage"
import { Routes, Route, Link } from "react-router-dom"
import LoginScreen from "./Screens/LoginScreen"
import GoogleSuccessPage from "./components/Login/GoogleSuccessPage"
import { useEffect } from "react"
import { ProductDetailScreen } from "./Screens/ProductDetailScreen"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./store"
import { getUserDataWithToken } from "./Slices/userSlice"
import Modal from "./components/Modal/Modal"
import { BillingPage } from "./Screens/BillingPage"





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






function App() {


  const dispatch = useDispatch<AppDispatch>()



  useEffect(() => {

    // console.log("Call dispatch for home page ---->")



    // // // Calling user data if user login -->
    let checkToken = gettingTokenInCookieAndLocalHost()

    if (checkToken) {
      dispatch(getUserDataWithToken(checkToken))
    }




  }, [])



  return (

    <>


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
