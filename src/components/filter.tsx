import { useAuth } from "@/context/authContext";
import { IoSearchOutline } from "react-icons/io5";

export const Filter = () => {
    const { handleOpenModalCreate, handleChangeFilter, handleCleanFilter, filter } = useAuth();

    function handleClick(e: React.FormEvent) {
        e.preventDefault();
        handleCleanFilter(e);
    }

    return (
        <div className="my-4 text-sm rounded-lg w-full">
            <form className="flex items-center gap-2 m-2">
                <div className="flex gap-4 items-center shadow-md rounded-md w-[30%] p-3 bg-white">
                    <h2 className="text-xl"><IoSearchOutline /></h2>
                    <input
                        onChange={handleChangeFilter}
                        name="filter"
                        value={filter.filter || ""}
                        className="w-[100%] outline-none text-gray-600"
                        type="text"
                        placeholder="Buscar por..."
                    />
                </div>
                <div className="p-2">
                    <button onClick={handleClick} className="flex gap-4 items-center p-8 py-2 border hover:bg-blue-100 hover:shadow-md delay-100 duration-500 bg-blue-200 text-blue-600 rounded-xl">
                        Limpiar filtros
                    </button>
                </div>
            </form>
            <div className="flex justify-end items-center w-full border-t mb-6">
                <button className="flex gap-4 items-center mt-2 p-8 py-2 border hover:bg-green-100 hover:shadow-md delay-100 duration-500 bg-green-200 text-green-600 rounded-xl" onClick={handleOpenModalCreate}>
                    Agregar
                </button>
            </div>
        </div>
    );
};
