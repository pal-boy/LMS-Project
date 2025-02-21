import React from 'react'
import HomeLayout from '../Layouts/HomeLayout.jsx'
import { Link } from 'react-router-dom'
import homePageMainImage from '../Assests/homePageMainImage.png'

const HomePage = () => {
  return (
    <HomeLayout>
        <div className="flex-col mx-9 sm:flex-row gap-10 sm:mx-16 h-[85vh] sm:h-[90vh] sm:pt-10 text-white md:flex md:items-center md:justify-center lg:flex lg:items-center lg:justify-center">
            <div className="w-full pt-24 sm:pt-10 sm:w-1/2 sm:space-y-6">
                <h1 className=" mb-4 text-2xl sm:text-5xl font-semibold">
                    Find out best 
                    <span className='text-yellow-500 font-bold'>
                        &nbsp;Online courses
                    </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-200">
                    We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                </p>
                <div className=" mt-4 sm:space-x-6">
                    <Link to='/courses'>
                        <button className='text-sm m-2 px-2 py-1 bg-yellow-500 sm:px-5 sm:py-3 rounded-md font-semibold sm:text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300'>
                            Explore courses
                        </button>
                    </Link>

                    <Link to='/contact'>
                        <button className='text-sm ml-2 px-2 py-1 border border-yellow-500 sm:px-5 sm:py-3 rounded-md font-semibold sm:text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300'>
                            Contact us
                        </button>
                    </Link>
                </div>
            </div>
            <div className="w-full mt-4 sm:w-1/2 flex items-center justify-center">
                <img src={homePageMainImage} alt="homePage image" />
            </div>
        </div>
    </HomeLayout>
  )
}

export default HomePage
