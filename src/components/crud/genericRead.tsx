import { useEffect, useState } from "react";
import { Filter } from "../filter";
import { Pagination } from "../pagination";
import { AnimatePresence } from "motion/react";
import PageTransition from "../animation/pageTransition";

interface Props<T> {
    array: T[]
    headers: string[]
    renderItem: (item: T) => React.ReactNode;
}

export const GenericRead = <T,>({ array, renderItem, headers }: Props<T>) => {
    const [message, setMessage] = useState<string>('')
    useEffect(() => {
        setMessage('No se han encontrado registros.')
    }, [])

    return (
        <>
            <AnimatePresence mode="wait">
                <PageTransition>
                    <div className="overflow-hidden">
                        <Filter />
                        <table className="w-full shadow-lg">
                            <thead className="text-sm">
                                <tr className="">
                                    {headers.map((item, index) => (
                                        <th key={index}
                                            className={`p-4 bg-gray-600 text-gray-200
                                    ${index === 0 ? 'rounded-tl-lg' : ''} 
                                    ${index === headers.length - 1 ? 'rounded-tr-lg' : ''}`}
                                        >
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium rounded-lg">
                                {array && array.length > 0 ? (
                                    array.map((item, index) => {
                                        return (
                                            <tr key={index} className={`text-center text-gray-500 bg-white font-medium border hover:bg-gray-50 
                                    ${index === 0 ? 'rounded-lg' : ''} 
                                    ${index === headers.length - 1 ? 'rounded-lg' : ''}`}>
                                                {renderItem(item)}
                                            </tr>
                                        );
                                    })
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
