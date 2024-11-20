import { useAuth } from "@/context/authContext";
import { Fetch } from "@/utils/api/fetch";

interface Props<T> {
    url: string;
    bodyRequest: T;
    entityName: string;
    id: string | number;
    children: React.ReactNode;
    onCreateSuccess?: () => void;
}

export const GenericUpdate = <T extends object>({ url, bodyRequest, entityName, children, id, onCreateSuccess }: Props<T>) => {
    const { handleOpenModalUpdate, handleCleanInput, handleHighlightActivate, handlePrimaryKey } = useAuth();
    
    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        const request = await Fetch.put(url, bodyRequest);
        handleOpenModalUpdate()
        handleCleanInput()
        console.log(bodyRequest)
        if (onCreateSuccess) {
            onCreateSuccess();
            handleHighlightActivate()
            handlePrimaryKey(id)
        }

        return request;
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative">
                {/* Botón para cerrar */}
                <button
                    className="absolute top-2 right-2 hover:bg-gray-200 hover:text-black delay-100 duration-500 text-gray-200 border w-8 h-8 text-lg rounded-full"
                    onClick={handleOpenModalUpdate}
                >
                    &times;
                </button>
                {/* Título y formulario */}
                <div className="bg-gray-600 p-2 text-gray-200 rounded-t-lg">
                    <h2 className="text-lg font-bold mb-4">Modificar {entityName} : {id}</h2>
                </div>
                <form onSubmit={handleUpdate} className="p-6">
                    {children}
                    <button type="submit" className="bg-blue-500 text-white hover:bg-blue-400 py-2 px-4 rounded mt-4 delay-100 duration-500">
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    )
}