import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const Pagination = () => {
    return (
        <div className="flex justify-end text-md mt-10 m-4">
            <div className="flex bg-white rounded-l-md rounded-r-md shadow-lg">
                <button className="px-4 p-1.5 text-gray-500 hover:bg-gray-600 hover:text-gray-200 rounded-l-md delay-100 duration-500"><IoIosArrowBack /></button>
                <button className="px-4 p-1.5 text-gray-500 border-l hover:bg-gray-600 hover:text-gray-200 delay-100 duration-500">1</button>
                <button className="px-4 p-1.5 text-gray-500 hover:bg-gray-600 hover:text-gray-200 delay-100 duration-500">0</button>
                <button className="px-4 p-1.5 text-gray-500 hover:bg-gray-600 hover:text-gray-200 delay-100 duration-500">2</button>
                <div className="px-4 p-1.5 text-gray-500 hover:bg-gray-600 hover:text-gray-200 delay-100 duration-500">...</div>
                <button className="px-4 p-1.5 text-gray-500 border-r hover:bg-gray-600 hover:text-gray-200 delay-100 duration-500">3</button>
                <button className="px-4 p-1.5 hover:bg-gray-600 hover:text-gray-200 rounded-r-md delay-100 duration-500"><IoIosArrowForward /></button>
            </div>
        </div>
    )
}