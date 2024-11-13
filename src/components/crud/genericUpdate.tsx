import { useAuth } from "@/context/authContext";
import { Fetch } from "@/utils/api/fetch";
import { useEffect, useState } from "react";

interface Props<T> {
    url: string;
    bodyRequest: T;
    entityName: string;
    children: React.ReactNode;
}

export const GenericUpdate = <T extends object>({ url, bodyRequest, entityName, children }: Props<T>) => {
    const { handleOpenModalUpdate, data } = useAuth();
    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        const request = await Fetch.put(url, bodyRequest);
        handleOpenModalUpdate()
        return request;
    }

    useEffect(() => {
        console.log(bodyRequest)
    }, [])

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                {/* Botón para cerrar */}
                <button
                    className="absolute top-2 right-2 hover:text-gray-900 border w-7 h-auto text-lg rounded-full"
                    onClick={handleOpenModalUpdate}
                >
                    &times;
                </button>
                {/* Título y formulario */}
                <h2 className="text-lg font-bold mb-4">Modificar {entityName}</h2>
                <form onSubmit={handleUpdate}>
                    {children}
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    )
}