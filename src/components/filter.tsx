export const Filter = () => {
    return (
        <div className="flex gap-10 p-4 border my-4 bg-white text-sm rounded-lg">
            <div className="flex gap-2 grow">
                <input className="outline-none w-full border p-1 rounded-md" type="text" placeholder="Buscador" />
            </div>
            <div className=""></div>
            <div className="flex gap-2">
                <button className="px-8 border rounded-lg bg-sky-600 text-white">Importar</button>
                <button className="px-8 border rounded-lg bg-red-600 text-white">Exportar</button>
                <button className="px-8 border rounded-lg bg-green-600 text-white">Agregar</button>
            </div>
        </div>
    )
}