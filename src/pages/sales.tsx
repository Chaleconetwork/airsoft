import { SALE_COLUMNS, SALE_INPUTS, SALE_LABELS } from "@/utils/tableFormat/tableFormats";
import { iSaleBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericRead } from "@/components/crud/genericRead";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { iSale } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";

export default function Sales() {
    const [sales, setSales] = useState<iSale[]>([])
    const [userRut, setUserRut] = useState<string>('');
    const { openModal, data } = useAuth();

    const saleBodyRequest: iSaleBodyRequest = {
        unitValue: parseInt(data.unitValue),
        amount: parseInt(data.amount),
        userId: userRut,
        createdBy: 'Chaleco',
        lastModificationBy: null
    }

    useEffect(() => {
        async function getSales() {
            try {
                const getUserId = await Fetch.get(`https://localhost:7274/api/Users/GetUserByUsername/${'Israel'}`)
                setUserRut(getUserId.rut)
                const response = await Fetch.get('https://localhost:7274/api/Sales')
                setSales(response)
            } catch (e) {
                console.error(e)
            }   
        }
        
        getSales()
    }, [sales])

    return (
        <div>
            <h1 className="text-2xl font-semibold opacity-65">Ventas</h1>
            <GenericRead
                array={sales}
                headers={SALE_COLUMNS}
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

            {
                openModal && <GenericCreate
                    url='https://localhost:7274/api/Sales/CreateSale'
                    entity={saleBodyRequest}
                    inputsForm={SALE_INPUTS}
                    labelsForm={SALE_LABELS}
                    entityName='nueva venta'
                />
            }
        </div>
    )
}