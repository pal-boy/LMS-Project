import React from 'react'
import HomeLayout from '../Layouts/HomeLayout.jsx'
import aboutMainImage from '../Assests/aboutMainImage.png'
import { celebrities } from '../Constants/FamousPeople.js'
import CarouselSlide from '../Components/CarouselSlide.jsx'

const AboutUs = () => {
  return (
    <HomeLayout>
        <div className="pl-10 sm:pl-20 pt-5 flex flex-col text-white">
            <div className="sm:flex sm:items-center gap-5 sm:mx-10">
                <section 
                    style={{'--aboutimage-url': `url(${aboutMainImage})`}} 
                    className={`mt-20 bg-[image:var(--aboutimage-url)] bg-contain bg-center bg-no-repeat sm:w-1/2 sm:space-y-10 sm:bg-none`}>
                    <h1 className='text-3xl sm:text-5xl text-yellow-500 font-semibold'>
                        Affordable and quality education
                    </h1>
                    <p className="text-xl pr-5 mt-5 sm:text-xl text-gray-200">
                        Our goal is to provide the affordable and qualiy education to the world. We are providing the platform for the aspiring teachers and students to share their skills, creativity and knowledge to each other to empower and contribute in the growth and wellness of mankind. 
                    </p>
                </section>

                <div className="hidden sm:block w-1/2">
                    <img 
                        id="test1"
                        style={{
                            filter: "drop-shadow(0px 10px 10px rgb(0,0,0));"
                        }}
                        className="drop-shadow-2xl" 
                        src={aboutMainImage} 
                        alt="about main image" />
                </div>
            </div>

            <div className="carousel w-1/2 m-auto my-16">
                {celebrities && celebrities.map(celebrity =>   (<CarouselSlide {...celebrity} 
                            key={celebrity.slideNum} 
                            totalSlides={celebrities.length}        
                            />)
                        )
                    }
                    
            </div>
        </div>
    </HomeLayout>
  )
}

export default AboutUs
