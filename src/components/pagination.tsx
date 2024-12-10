import { useAuth } from "@/context/authContext";
import { useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const Pagination = () => {
    const { handleNextPage, handlePreviousPage, pagination } = useAuth()

    useEffect(()=> {
        // console.log('nextPage: ', pagination)
        // console.log('previousPage: ', pagination)
    }, [pagination])

    return (
        <div className="flex justify-end text-md mt-10 m-4">
            <div className="flex bg-white rounded-l-md rounded-r-md shadow-lg">
                <button
                    disabled={pagination === 1}
                    onClick={handlePreviousPage}
                    className={`px-4 p-1.5 rounded-l-md delay-100 duration-500 ${pagination === 1 ? 'opacity-10':'text-gray-500 hover:bg-gray-600 cursor-pointer hover:text-gray-200'}`}
                >
                    <IoIosArrowBack />
                </button>
                <button
                    className="px-4 p-1.5 text-gray-500 hover:bg-gray-600 cursor-pointer hover:text-gray-200 delay-100 duration-500"
                >
                    {pagination}
                </button>
                <button
                    // disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                    className="px-4 p-1.5 hover:bg-gray-600 cursor-pointer hover:text-gray-200 rounded-r-md delay-100 duration-500"
                >
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    );
};
