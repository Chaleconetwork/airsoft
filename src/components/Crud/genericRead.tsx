import { useEffect, useState } from "react";

interface Props<T> {
    array: T[]
    headers: string[]
    renderItem: (item: T) => React.ReactNode;
}

export const GenericRead = <T,>({ array, renderItem, headers }: Props<T>) => {
    const [message, setMessage] = useState<string>('')
    useEffect(() => {
        setMessage('¡No se ha podido comunicar con la API!')
    }, [])

    return (
        <table className="min-w-full my-4">
            <thead className="opacity-90 bg-gray-200 text-xs font-semibold">
                <tr>{headers.map((item, index) => (<th key={index} className="p-2">{item}</th>))}</tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
                {array && array.length > 0 ? (
                    array.map((item, index: number) => {
                        return (
                            <tr key={index} className="text-center">
                                {renderItem(item)}
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan={headers.length} className="py-4 text-center font-bold text-red-600">
                            {message}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};
