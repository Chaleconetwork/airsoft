import { useEffect, useState } from "react";
import { Filter } from "../filter";

interface Props<T> {
    array: T[]
    headers: string[]
    renderItem: (item: T) => React.ReactNode;
}

export const GenericRead = <T,>({ array, renderItem, headers }: Props<T>) => {
    const [message, setMessage] = useState<string>('')
    useEffect(() => {
        setMessage('No es posible conectar con el servidor. Por favor intenta más tarde 😅.')
    }, [])

    return (
        <>
            <Filter />
            <table className="min-w-full my-4">
                <thead className="opacity-90 bg-gray-200 text-xs font-semibold">
                    <tr>{headers.map((item, index) => (<th key={index} className="p-2">{item}</th>))}</tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    {array && array.length > 0 ? (
                        array.map((item, index) => {
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
        </>
    );
};
