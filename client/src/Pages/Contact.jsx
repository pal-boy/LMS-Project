import React, { useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout';
import toast from 'react-hot-toast';
import { isEmail } from '../Helpers/regexMatcher';
import axiosInstance from '../Helpers/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const navigate = useNavigate();
    const [userInput , setUserInput] = useState({
        name: '',
        email: '',
        message: ''
    });

    function handleInputChange(e){
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        });
    };

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.name || !userInput.email || !userInput.message){
            toast.error('Please fill all the fields');
            return;
        };
        if(!isEmail(userInput.email)){
            toast.error('Please enter a valid email');
            return;
        };
        try {
            const response = axiosInstance.post('/contact/contactUs', userInput);
            toast.promise(response,{
                loading: 'Submitting your response...',
                success: 'Response submitted successfully',
                error: 'Failed to submit response'  
            });
            const contactResponse = await response;
            if(contactResponse.status === 200){
                setUserInput({
                    name: '',
                    email: '',
                    message: ''
                });
            };
            navigate('/');
        } catch (error) {
            toast.error('Something went wrong while submitting response');
        }
    };

  return (
    <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
            <form 
                noValidate
                onSubmit={onFormSubmit}
                className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]">
                <h1 className="text-3xl font-semibold">
                    Contact Form
                </h1>

                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="name" className="text-xlfont-semibold">
                        Name
                    </label>
                    <input 
                        className="bg-transparent border px-2 py-1rounded-sm"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        onChange={handleInputChange}
                        value={userInput.name}
                    />

                </div>

                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="email" className="text-xlfont-semibold">
                        Email
                    </label>
                    <input 
                        className="bg-transparent border px-2 py-1rounded-sm"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleInputChange}
                        value={userInput.email}
                    />

                </div>

                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="message" className="text-xlfont-semibold">
                         Message
                    </label>
                    <textarea 
                        className="bg-transparent border px-2 py-1rounded-sm resize-none h-40"
                        id="message"
                        name="message"
                        placeholder="Enter your message..."
                        onChange={handleInputChange}
                        value={userInput.message}
                    />

                </div>
                <button type="submit"
                    className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-outduration-300 rounded-sm py-2 font-semiboldtext-lg cursor-pointer"
                >
                    Submit
                </button>

            </form>
        </div>
            
    </HomeLayout>
  );
}

export default Contact
