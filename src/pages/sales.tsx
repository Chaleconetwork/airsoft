import { GenericRead } from "@/components/crud/genericRead";
import { Filter } from "@/components/filter";
import { iSale } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";
import { useEffect, useState } from "react";

export default function Sales() {

    const headers = ['Id', 'Valor unitario', 'Cantidad', 'Valor total', 'Encargado', 'Fecha creación', 'Creado por', 'Fecha ultima modificación', 'Ultima modificación por']
    const [sales, setSales] = useState<iSale[]>([])
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
        async function getSales() {
            const response = await Fetch.get('https://localhost:7274/api/Sales')
            setSales(response)
        }
        if (isClient)
            getSales()
    }, [isClient])

    if (!isClient)
        return null

    return (
        <div>
            <h1 className="text-2xl font-semibold opacity-65">Ventas</h1>
            <GenericRead
                array={sales}
                headers={headers}
                renderItem={(item) => (
                    <>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">${item.unitValue}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.amount}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">${item.totalValue}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.username}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.creationDate}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.createdBy}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.lastModificationDate}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.lastModificationBy}</td>
                    </>
                )} />
        </div>
    )
}