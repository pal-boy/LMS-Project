import { useNavigate } from "react-router-dom";

function Denied() {
    const navigate = useNavigate();
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-7xl sm:text-9xl font-extrabold text-white tracking-widest">
                403
            </h1>
            <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
                Access denied
            </div>
            <button onClick={() => navigate(-1)} className="mt-5">
                <span onClick={() => navigate(-1)} className="relative block font-bold px-5 py-1 sm:px-8 sm:py-3 bg-[#de21af] border border-current">
                    Go Back
                </span>
            </button>
        </main>
    );

}

export default Denied;