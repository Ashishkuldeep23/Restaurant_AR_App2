
// import React from 'react'

import { Link, useLocation, useNavigate } from "react-router-dom"
import { setNotification, userState } from "../../Slices/userSlice"

export const Navbar = () => {

    const navigate = useNavigate()

    const userData = userState().userData

    const location = useLocation()

    // console.log(location);


    return (
        <>

            <div className=" bg-themeColor w-full h-16 border-b flex  items-center z-10 relative">
                {/* Home div */}
                <div className=" my-auto mr-auto ml-5 hover:scale-110 hover:cursor-pointer transition-all">
                    <Link to='/'>
                        <p
                            className=" font-bold px-2 rounded border text-white"
                        >HOME</p>
                    </Link>
                </div>


                {/* User image div */}
                <div className=" flex justify-between items-center gap-2 sm:gap-5 my-auto ml-auto mr-5 hover:scale-110 hover:cursor-pointer transition-all">

                    <Notification />


                    <Link to={userData.firstName ? "/profile" : "/login"}>
                        <img

                            // onClick={()=>{userData.firstName ? "" : navigate("/login")}}
                            className=" h-12 rounded-full border"
                            src={userData.profilePic}
                            alt=""

                        />
                    </Link>
                </div>

            </div>



            {/* <div className=""> */}

            {
                (userData.role === "chef" && location.pathname !== "/chef-page")
                &&

                <div className=" sticky top-0 left-1/2 z-5 flex  justify-center">
                    <button
                        className=" bg-sky-200/50 backdrop-blur-3xl capitalize font-bold  my-0.5  px-4 py-0.5 border  border-sky-400 text-sky-950 rounded-full "
                        onClick={() => { navigate("/chef-page") }}
                    >Goto chef Page</button>
                </div>

            }
            {/* </div> */}

        </>
    )
}



import { Fragment, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { socket } from "../../App"
import { useDispatch } from "react-redux"

function Notification() {

    const { notification } = userState()

    const dispatch = useDispatch()

    // const [navigation, setNotification] = useState<string[]>([])


    useEffect(() => {

        // // // User events ----->

        socket.on("order-received", (res) => {

            // console.log(res)

            dispatch(setNotification(`${res.message}`))

        })



        // socket.on("chef-order-recived", (res) => {
        //     console.log(res)
        //     console.log(res.message)
        //     dispatch(setNotification(`${res.message}`))
        // })



        return () => {
            socket.disconnect();
        };

    }, [])



    return (
        <>

            <Menu as="div" className="relative ml-3 ">
                <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="h-8 w-8 rounded-full object-cover"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrbCy3v0RZ0RS8uhjD6elbAFBqQntE31uk2VoMYnPlmMkJLXQRI-gEdmsNZoZy23-NUW8&usqp=CAU"
                            alt=""
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute -right-12 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >

                        <div className=" z-20 relative">


                            <ul>

                                {
                                    notification.map((ele, i) => {
                                        return (
                                            <Fragment key={i}>
                                                <Menu.Item>
                                                    <li

                                                        className={'block px-4 py-2 text-sm text-gray-700 '}
                                                    >
                                                        {ele}
                                                    </li>

                                                </Menu.Item>
                                            </Fragment>
                                        )
                                    })
                                }


                                <Menu.Item>
                                    <li

                                        className={'block px-4 py-2 text-sm text-gray-700 '}
                                    >
                                        New notification
                                    </li>

                                </Menu.Item>

                            </ul>


                        </div>


                    </Menu.Items>
                </Transition>
            </Menu>

        </>
    )
}



