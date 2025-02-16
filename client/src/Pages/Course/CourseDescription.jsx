import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeLayout from '../../Layouts/HomeLayout';

const CourseDescription = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    // console.log("CourseDescription state", state);
    const { role, data } = useSelector((state) => state.auth);
    // console.log("stateAuth", useSelector((state) => state.auth));
    // console.log("CourseDescription role and data", role, data);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 px-5 sm:px-20 flex flex-col items-center justify-center text-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 py-4 sm:py-10 relative">
                    <div className="hidden sm:block space-y-5">
                        <img 
                            className="w-full h-64"
                            alt="thumbnail"
                            src={state?.thumbnail?.secure_url}
                        />

                        <div className="space-y-4">
                            <div className="flex flex-col items-center justify-between text-xl">

                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Total lectures : {" "}
                                    </span>
                                    {state?.numberOfLectures}
                                </p>

                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Instructor : {" "}
                                    </span>
                                    {state?.createdBy}
                                </p>

                            </div>

                            { role === "ADMIN" || data?.subscription?.status === "active" ? (
                                <button onClick={() => navigate("/course/displaylectures", {state: {...state}})} className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                    Watch lectures
                                </button>
                                ) : (
                                    <button onClick={() => navigate("/checkout")} className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                        Subscribe
                                    </button>
                                )

                            }
                        </div>
                       

                    </div>

                    <div className="space-y-2 text-xl">
                        <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
                            {state?.title}
                        </h1>

                        <img 
                            className="block sm:hidden w-full h-64"
                            alt="thumbnail"
                            src={state?.thumbnail?.secure_url}
                        />

                        <p className="text-yellow-500 text-2xl">Course description: </p>
                        <p className='text-[1rem] sm:text-xl'>{state?.description}</p>

                        <div className="block sm:hidden space-y-4">
                            <div className="flex flex-col items-center justify-between text-xl">

                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Total lectures : {" "}
                                    </span>
                                    {state?.numberOfLectures}
                                </p>

                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Instructor : {" "}
                                    </span>
                                    {state?.createdBy}
                                </p>

                            </div>

                            { role === "ADMIN" || data?.subscription?.status === "active" ? (
                                <button onClick={() => navigate("/course/displaylectures", {state: {...state}})} className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                    Watch lectures
                                </button>
                                ) : (
                                    <button onClick={() => navigate("/checkout")} className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                        Subscribe
                                    </button>
                                )

                            }
                        </div>

                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseDescription
