import Image from "next/image"
import Link from "next/link"

export const Filter = () => {
    return (
        <div className="flex gap-10 p-4 border my-4">
            <div className="flex  gap-2 grow">
                <input className="outline-none w-full border p-1.5 rounded-md" type="text" placeholder="Rut" />
                <input className="outline-none w-full border p-1.5 rounded-md" type="text" placeholder="Nombre" />
                <input className="outline-none w-full border p-1.5 rounded-md" type="text" placeholder="Compras" />
            </div>
            <div className="flex gap-2">
                <button className="bg-blue-600 text-white px-8 py-1 rounded-full">Importar</button>
                <button className="bg-yellow-600 text-white px-8 py-1 rounded-full">Exportar</button>
                <button className="bg-green-600 text-white px-8 py-1 rounded-full">Crear</button>
            </div>
        </div>
    )
}