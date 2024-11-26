import React from 'react'
import {BsFacebook , BsInstagram , BsLinkedin , BsTwitter} from 'react-icons/bs'

const Footer = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
  return (
    <div>
      <footer className='relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20'>

        <section className='text-2xl text-white'>
            Copyright {year} | All Rights Reserved
        </section>

        <section className='flex items-center justify-center gap-5 text-2xl text-white'>
            <a className='hover:text-yellow-500 transition-all ease-in-out duration-300' href="https://www.facebook.com/aakash.pal.585112">
                <BsFacebook/>
            </a>
            <a className='hover:text-yellow-500 transition-all ease-in-out duration-300' href="https://www.instagram.com/_palboy_/">
                <BsInstagram/>
            </a>
            <a className='hover:text-yellow-500 transition-all ease-in-out duration-300' href="https://www.linkedin.com/in/aakash-pal-486370258/">
                <BsLinkedin/>
            </a>
            <a className='hover:text-yellow-500 transition-all ease-in-out duration-300' href="#">
                <BsTwitter/>
            </a>
        </section>

      </footer>
    </div>
  )
}

export default Footer
