import { useAuth } from "@/context/authContext";

export const Filter = () => {
    const { handleOpenModalCreate, handleChangeFilter } = useAuth();
    
    return (
        <div className="flex gap-10 p-4 border my-4 bg-white text-sm rounded-lg">
            <form className="flex gap-2 grow">
                <input onChange={handleChangeFilter} name="filter" className="outline-none w-full border p-1 rounded-md" type="text" placeholder="Buscador" />
                <button className="px-8 whitespace-nowrap border rounded-lg bg-sky-600 text-white">Limpiar filtros</button>
            </form>
            <div className=""></div>
            <div className="flex gap-2">
                <button className="px-8 border rounded-lg bg-green-600 text-white" onClick={handleOpenModalCreate}>
                    Agregar
                </button>
            </div>
        </div>
    )
}