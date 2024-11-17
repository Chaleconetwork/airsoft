import PageTransition from "../animation/pageTransition";
import { useAuth } from "@/context/authContext";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Pagination } from "../pagination";
import { Filter } from "../filter";

interface ItemWithPrimaryKey {
    rut?: string;
    id?: number;
}

interface Props<T> {
    array: T[]
    headers: string[]
    renderItem: (item: T) => React.ReactNode;
}

export const GenericRead = <T extends ItemWithPrimaryKey>({ array, renderItem, headers }: Props<T>) => {
    const [highlightIndex, setHighlightIndex] = useState<number | string | null>(null); // Índice destacado
    const { highlightActivate, primaryKey, handleCleanPrimaryKey } = useAuth();
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        setMessage('No se han encontrado registros.');
        console.log('primarykey: ', primaryKey)
        setHighlightIndex(primaryKey);
        const timer = setTimeout(() => (handleCleanPrimaryKey(), setHighlightIndex(null)), 2000);
        return () => clearTimeout(timer);

    }, [highlightActivate]);

    return (
        <>
            <AnimatePresence mode="wait">
                <PageTransition>
                    <div className="overflow-hidden">
                        <Filter />
                        <table className="w-full shadow-lg">
                            <thead className="text-sm">
                                <tr>
                                    {headers.map((item, index) => (
                                        <th key={index} className={`p-4 bg-gray-600 text-gray-200 ${index === 0 ? 'rounded-tl-lg' : ''} ${index === headers.length - 1 ? 'rounded-tr-lg' : ''}`}>
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium rounded-lg delay-100 duration-500">
                                {array && array.length > 0 ? (
                                    array.map((item, index) => (
                                        <tr
                                            key={index}
                                            className={`text-center text-gray-500 font-medium border hover:bg-gray-100 delay-100 duration-500
                                                ${highlightIndex === undefined
                                                    ? index === array.length - 1 ? 'bg-green-200'
                                                        : 'bg-white'
                                                    : item['rut'] === highlightIndex || item['id'] === highlightIndex
                                                        ? 'bg-green-200'
                                                        : 'bg-white'}`}
                                        >
                                            {renderItem(item)}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={headers.length} className="py-4 text-center font-bold text-gray-600">
                                            {message}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div>
                            <Pagination />
                        </div>
                    </div>
                </PageTransition>
            </AnimatePresence>
        </>
    );
};
