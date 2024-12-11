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

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Función para validar el RUT
    const validarRut = (rut: string): boolean => {
        // Eliminar puntos, guiones y espacios
        rut = rut.replace(/\./g, '').replace(/-/g, '').trim();
        if (!/^\d{1,8}[0-9kK]$/.test(rut)) {
            setErrorMessage('El RUT tiene un formato inválido.');
            return false;
        }

        // Separar número base y dígito verificador
        const numero = rut.slice(0, -1);
        const dv = rut.slice(-1).toUpperCase();

        // Calcular el dígito verificador
        let suma = 0;
        let multiplicador = 2;
        for (let i = numero.length - 1; i >= 0; i--) {
            suma += parseInt(numero[i], 10) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }
        const resto = suma % 11;
        const dvCalculado = resto === 1 ? 'K' : resto === 0 ? '0' : (11 - resto).toString();

        if (dv !== dvCalculado) {
            setErrorMessage('El dígito verificador del RUT es inválido.');
            return false;
        }

        setErrorMessage(null); // Si es válido, limpiar el mensaje de error
        return true;
    };

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();

        if (entityName === 'nuevo usuario' || entityName === 'nuevo cliente' || entityName === 'nuevo jugador') {
            const rut = (bodyRequest as any).rut;
            if (!validarRut(rut)) {
                return;
            }
        }

        const request = await Fetch.post(url, bodyRequest);
        setBtnDisable(true);
        handleOpenModalCreate();
        handleCleanInput();

        if (onCreateSuccess) {
            onCreateSuccess();
            handleHighlightActivate();
            handlePrimaryKey(id!);
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
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
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
