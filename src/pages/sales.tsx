import { SALE_COLUMNS } from "@/utils/tableFormat/columnsFormats";
import { iSaleBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericUpdate } from "@/components/crud/genericUpdate";
import { GenericRead } from "@/components/crud/genericRead";
import { GenericInput } from "@/components/genericInput";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { iSale } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";

export default function Sales() {
    const { openModalCreate, openModalUpdate, handleOpenModalUpdate, filter } = useAuth();
    const [filteredSales, setFilteredSales] = useState<iSale[]>([]);
    const [userRut, setUserRut] = useState<string>('');
    const [sales, setSales] = useState<iSale[]>([])

    const [formValues, setFormValues] = useState<any>({
        id: '',
        unitValue: '',
        amount: '',
        userId: '',
        rutCliente: '',
        createdBy: '',
        lastModificationBy: null
    });

    const saleBodyRequest: iSaleBodyRequest = {
        unitValue: parseInt(formValues.unitValue),
        amount: parseInt(formValues.amount),
        userId: userRut,
        rutCliente: formValues.rutCliente,
        createdBy: 'Chaleco',
        lastModificationBy: null
    }

    if (openModalUpdate) {
        saleBodyRequest.id = parseInt(formValues.id)
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    useEffect(() => {
        try {
            const filtered = sales.filter(sale =>
                sale.id!.toString().toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                sale.unitValue!.toString().toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                sale.amount.toString().toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                sale.totalValue.toString().toLowerCase().includes(filter.filter?.toLowerCase() || '')
            );

            setFilteredSales(filtered);
        } catch (e) {
            console.error(e)
        }

    }, [filter, sales]);

    return (
        <div>
            <h1 className="text-2xl font-semibold opacity-65">Ventas</h1>
            <GenericRead
                array={filteredSales}
                headers={SALE_COLUMNS}
                renderItem={(i) => (
                    <>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.id}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">${i.unitValue}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.amount}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">${i.totalValue}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.username}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.rutCliente}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.creationDate}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.createdBy}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.lastModificationDate}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.lastModificationBy}</td>
                        <td className="py-4 whitespace-nowrap">
                            <button
                                onClick={() => {
                                    handleOpenModalUpdate();
                                    setFormValues(
                                        {
                                            id: i.id,
                                            unitValue: i.unitValue,
                                            amount: i.amount,
                                            totalValue: i.totalValue,
                                            username: i.username,
                                            rutCliente: i.rutCliente
                                        }
                                    )
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Editar
                            </button>
                        </td>
                    </>
                )} />

            {
                openModalCreate && <GenericCreate
                    url='https://localhost:7274/api/Sales/CreateSale'
                    bodyRequest={saleBodyRequest}
                    entityName='nueva venta'
                >
                    <GenericInput label='Valor unitario' name='unitValue' type='number' handleChange={handleChange} />
                    <GenericInput label='Cantidad' name='amount' type='number' handleChange={handleChange} />
                    <GenericInput label='Encargado' name='username' type='text' handleChange={handleChange} />
                    <GenericInput label='Cliente' name='rutCliente' type='text' handleChange={handleChange} />
                </GenericCreate>
            }
            {
                openModalUpdate && <GenericUpdate
                    url={`https://localhost:7274/api/Sales/UpdateSale/${formValues.id}`}
                    bodyRequest={saleBodyRequest}
                    entityName="venta"
                    id={formValues.id}
                >
                    <GenericInput label='Valor unitario' name='unitValue' type='number' value={formValues.unitValue} handleChange={handleChange} />
                    <GenericInput label='Cantidad' name='amount' type='number' value={formValues.amount} handleChange={handleChange} />
                </GenericUpdate>
            }
        </div>
    )
}