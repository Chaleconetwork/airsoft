import { useAuth } from '@/context/authContext';
import { Fetch } from '@/utils/api/fetch';
import { useEffect, useState } from 'react';

interface Props<T> {
    url: string;
    bodyRequest: T;
    entityName: string;
    children: React.ReactNode;
}

export const GenericCreate = <T,>({ url, bodyRequest, entityName, children }: Props<T>) => {
    const { handleOpenModalCreate } = useAuth();

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        const request = await Fetch.post(url, bodyRequest);
        handleOpenModalCreate()
        console.log('Create body request: ', bodyRequest)
        return request;
    }

    useEffect(() => {
        console.log('Url: ', url);
        // console.log(entity);
        console.log('variable produccion: ', process.env.NEXT_PUBLIC_API_URL);
    }, []);

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                <button
                    className="absolute top-2 right-2 hover:text-gray-900 border w-7 h-auto text-lg rounded-full"
                    onClick={handleOpenModalCreate}
                >
                    &times;
                </button>
                <h2 className="text-lg font-bold mb-4">Crear {entityName}</h2>
                <form onSubmit={handleCreate} className={`${entityName == 'usuario' ? 'flex gap-4':''}`}>
                    {children}
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
};
