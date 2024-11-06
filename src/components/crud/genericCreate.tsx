import { useAuth } from '@/context/authContext';
import { Fetch } from '@/utils/api/fetch';
import { useEffect, useState } from 'react';

interface Props<T> {
    url: string;
    entity: T;
    inputsForm: string[];
    labelsForm: string[];
    entityName: string;
}

export const GenericCreate = <T,>({ url, entity, inputsForm, entityName, labelsForm }: Props<T>) => {
    const { handleOpenModal, handleChange } = useAuth();

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        const request = await Fetch.post(url, entity);
        console.log(request);
        handleOpenModal()
        return request;
    }

    useEffect(() => {
        // console.log(url);
        // console.log(entity);
    }, []);

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                {/* Botón para cerrar */}
                <button
                    className="absolute top-2 right-2 hover:text-gray-900 border w-7 h-auto text-lg rounded-full"
                    onClick={handleOpenModal}
                >
                    &times;
                </button>
                {/* Título y formulario */}
                <h2 className="text-lg font-bold mb-4">Crear {entityName}</h2>
                <form onSubmit={handleCreate}>
                    {
                        inputsForm.map((item, index) => (
                            <div key={index} className='my-2'>
                                <label className='block' htmlFor={item}>{labelsForm[index]}</label>
                                {
                                    item !== 'roleId' ? <input required onChange={handleChange} name={item} type="text" className='p-1.5 outline-none border w-full rounded-md' placeholder='Campo obligatorio' /> :
                                        <select
                                            required
                                            name='roleId' // Usa el nombre correcto aquí
                                            onChange={handleChange} // Agrega el manejador de cambios
                                            className='p-1.5 outline-none border w-full rounded-md'
                                        >
                                            <option value={1}>Administrador</option>
                                            <option value={2}>Moderador</option>
                                            <option value={3}>Programador</option>
                                            <option defaultValue={1} selected>Asignar role</option>
                                        </select>
                                }
                            </div>
                        ))
                    }
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
};
