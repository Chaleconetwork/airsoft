import { useAuth } from '@/context/authContext';
import { Fetch } from '@/utils/api/fetch';
import { useState } from 'react';

interface Props<T> {
    url: string;
    bodyRequest: T;
    entityName: string;
    children: React.ReactNode;
    onCreateSuccess?: () => void;
    id?: string | number;
}

export const GenericCreate = <T extends object>({ url, bodyRequest, entityName, children, onCreateSuccess, id }: Props<T>) => {
    const { handleOpenModalCreate, handleHighlightActivate, handlePrimaryKey, handleCleanInput } = useAuth();
    const [btnDisable, setBtnDisable] = useState<boolean>(false)

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        const request = await Fetch.post(url, bodyRequest);
        setBtnDisable(true)
        handleOpenModalCreate()
        handleCleanInput()

        if (onCreateSuccess) {
            onCreateSuccess();
            handleHighlightActivate()
            handlePrimaryKey(id!)
        }

        return request;
    }

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
                <form onSubmit={handleCreate} className={`${entityName == 'usuario' ? 'flex gap-4' : ''}`}>
                    {children}
                    <button type="submit" disabled={btnDisable} className={`${btnDisable ? 'bg-gray-500': 'bg-blue-500'}  py-2 px-4 rounded mt-4 text-white`}>
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
};
