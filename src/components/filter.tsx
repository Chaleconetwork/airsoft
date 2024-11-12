import { useAuth } from "@/context/authContext";

export const Filter = () => {
    const { handleOpenModalCreate, handleOpenModalUpdate, handleChangeFilter } = useAuth();
    
    return (
        <div className="flex gap-10 p-4 border my-4 bg-white text-sm rounded-lg">
            <form className="flex gap-2 grow">
                <input onChange={handleChangeFilter} name="filter" className="outline-none w-full border p-1 rounded-md" type="text" placeholder="Buscador" />
            </form>
            <div className=""></div>
            <div className="flex gap-2">
                <button className="px-8 border rounded-lg bg-sky-600 text-white">Importar</button>
                <button className="px-8 border rounded-lg bg-red-600 text-white">Exportar</button>
                <button className="px-8 border rounded-lg bg-green-600 text-white" onClick={handleOpenModalCreate}>
                    Agregar
                </button>
                <button className="px-8 border rounded-lg bg-yellow-600 text-white" onClick={handleOpenModalUpdate}>
                    Modificar
                </button>
            </div>
        </div>
    )
}