import React from 'react'

const CarouselSlide = ({image , title, description, slideNum, totalSlides }) => {
    return (
        <div id={`slide${slideNum}`} className="carousel-item relative w-full">
            <div className="mt-5 sm:mt-0 flex flex-col items-center justify-center gap-4 sm:px-[15%]">
                <img src={image} className="w-20 sm:w-40 rounded-full border-2 border-gray-400" />
                <p className="text-sm pl-1 w-[60%] sm:w-full sm:text-xl text-gray-200">
                    {description}
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold">{title}</h3>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href={`#slide${(slideNum == 1 ? totalSlides : (slideNum - 1))}`} className="sm:btn sm:btn-circle">❮</a> 
                    <a href={`#slide${(slideNum) % totalSlides + 1}`} className="sm:btn sm:btn-circle">❯</a>
                </div>
            </div>
            
        </div> 
);
}

export default CarouselSlide
