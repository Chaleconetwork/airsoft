import { GenericRead } from "@/components/Crud/genericRead";
import { iSale } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";
import { useEffect, useState } from "react";

export default function Sales() {

    const headers = ['Id', 'Valor unitario', 'Cantidad', 'Valor total', 'Encargado']
    const [message, setMessage] = useState<string>('')
    const [sales, setSales] = useState<iSale[]>([])

    async function getSales() {
        const response = await Fetch.get('https://localhost:7274/api/Sales')
        console.log(response)
        setSales(response)
        response ?? setMessage('¡No se ha podido comunicar con la API!')
    }

    useEffect(() => {
        getSales()
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-semibold opacity-65">Ventas</h1>
            <GenericRead 
                array={sales} 
                headers = {headers}
                renderItem={(item) => (
                <>
                    <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.unitValue}</td>
                    <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.amount}</td>
                    <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.totalValue}</td>
                    <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.userId}</td>
                </>
            )} />
        </div>
    )
}