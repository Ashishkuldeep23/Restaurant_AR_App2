import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { modalStore, setOpenMoadl } from '../../Slices/ModalSlice'
import { useDispatch } from 'react-redux'
// import { RootState } from '../../store'

export default function Modal() {
    // const [open, setOpen] = useState(true)

    const dispatch = useDispatch()

    // const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const open = modalStore().open



    function setOpen(data: boolean) {

        dispatch(setOpenMoadl(data))

    }


    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300 "
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className=" pt-10 pl-10 flex min-h-full justify-center items-center p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg  text-left transition-all sm:my-8 delay-150 lg:max-w-3/5 "
                            >
                                {/* Widt of Modal is controled by above div ----> */}

                                <div
                                    className='py-12 bg-transparent '
                                    onClick={() => setOpen(false)}
                                >

                                    {/* Below div will hold children ---> main content */}
                                    <div
                                        className={` bg-white rounded px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border flex flex-col items-center  overflow-hidden`}
                                        onClick={(e)=>{e.stopPropagation()}}
                                    >

                                        {
                                            modalStore().children
                                        }


                                    </div>


                                    <button
                                        type="button"
                                        
                                        className=" justify-center  px-2 py-1 text-sm shadow-sm ring-1 ring-inset ring-gray-600   sm:mt-0 absolute right-0.5 bottom-4 rounded-l-md bg-gray-600 text-white z-10 inline-flex  mt-10 font-bold"
                                        ref={cancelButtonRef}
                                    >
                                        <span className=' px-1 '>X</span>
                                        <span className=' '>Close</span>
                                    </button>

                                </div>


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>


            </Dialog>
        </Transition.Root>
    )
}
