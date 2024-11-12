import { iSaleBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericRead } from "@/components/crud/genericRead";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { iSale } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";
import { GenericUpdate } from "@/components/crud/genericUpdate";
import { SALE_COLUMNS } from "@/utils/tableFormat/columnsFormats";
import { UPDATE_SALE_INPUTS, UPDATE_SALE_LABELS } from "@/utils/tableFormat/updateInputFormats";
import { CREATE_SALE_INPUTS, CREATE_SALE_LABELS } from "@/utils/tableFormat/createInputFormats";

export default function Sales() {
    const [sales, setSales] = useState<iSale[]>([])
    const [userRut, setUserRut] = useState<string>('');
    const { openModalCreate, openModalUpdate, data } = useAuth();

    const saleBodyRequest: Partial<iSaleBodyRequest> = {
        unitValue: parseInt(data.unitValue),
        amount: parseInt(data.amount),
        userId: userRut,
        rutCliente: data.rutCliente,
        createdBy: 'Chaleco',
        lastModificationBy: null
    }

    if (openModalUpdate) {
        saleBodyRequest.id = parseInt(data.id) ? parseInt(data.id) : null;
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
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.rutCliente}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.creationDate}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.createdBy}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.lastModificationDate}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.lastModificationBy}</td>
                    </>
                )} />

            {
                openModalCreate && <GenericCreate
                    url='https://localhost:7274/api/Sales/CreateSale'
                    bodyRequest={saleBodyRequest}
                    inputsForm={CREATE_SALE_INPUTS}
                    labelsForm={CREATE_SALE_LABELS}
                    entityName='nueva venta'
                />
            }
            {
                openModalUpdate && <GenericUpdate
                    url='https://localhost:7274/api/Sales/UpdateSale'
                    bodyRequest={saleBodyRequest}
                    inputsForm={UPDATE_SALE_INPUTS}
                    labelsForm={UPDATE_SALE_LABELS}
                    entityName='venta'
                />
            }
        </div>
    )
}