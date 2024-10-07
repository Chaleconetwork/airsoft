interface Props<T> {
    array: T[]
    headers: string[]
    renderItem: (item: T) => React.ReactNode;
}

export const GenericRead = <T,>({ array, renderItem, headers }: Props<T>) => {
    return (
        <div className="my-4">
            <table className="min-w-full">
                <thead className="opacity-90 bg-gray-200 text-xs font-semibold">
                    <tr>{headers.map(i => (<th className="p-2">{i}</th>))}</tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    {array.length > 0 ? (
                        array.map((item, index) => (
                            <tr key={index} className="text-center">
                                {renderItem(item)} {/* Renderiza el ítem utilizando la función */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={1} className="text-center py-4">No hay registros disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
