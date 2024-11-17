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
    const [userId, setUserId] = useState<string>('');
    const [sales, setSales] = useState<iSale[]>([])

    const [formValues, setFormValues] = useState<any>({
        id: '',
        unitValue: '',
        amount: '',
        paymentMethod: '',
        userId: '',
        rutClient: '',
        createdBy: '',
        lastModificationBy: null
    });

    const saleBodyRequest: iSaleBodyRequest = {
        unitValue: parseInt(formValues.unitValue),
        amount: parseInt(formValues.amount),
        paymentMethod: formValues.paymentMethod,
        userId: userId,
        rutClient: formValues.rutClient,
        createdBy: 'Chaleco',
        lastModificationBy: null
    }

    if (openModalUpdate) {
        saleBodyRequest.id = parseInt(formValues.id)
    }

    async function getSales() {
        try {
            const getUserId = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Users/GetUserByUsername/${'Israel'}`)
            setUserId(getUserId?.rut)
            const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Sales`)
            setSales(response)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getSales()
    }, [])

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
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.paymentMethod}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.username}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.rutClient}</td>
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
                                            paymentMethod: i.paymentMethod,
                                            username: i.username,
                                            rutClient: i.rutClient
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
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Sales/CreateSale`}
                    bodyRequest={saleBodyRequest}
                    entityName='nueva venta'
                    onCreateSuccess={getSales}
                >
                    <GenericInput label='Valor unitario' name='unitValue' type='number' handleChange={handleChange} />
                    <GenericInput label='Cantidad' name='amount' type='number' handleChange={handleChange} />
                    <GenericInput label='Método pago' name='paymentMethod' type='text' handleChange={handleChange} />
                    <GenericInput label='Encargado' name='username' type='text' value='Israel' handleChange={handleChange} />
                    <GenericInput label='Cliente' name='rutClient' type='text' handleChange={handleChange} />
                </GenericCreate>
            }
            {
                openModalUpdate && <GenericUpdate
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Sales/UpdateSale/${formValues.id}`}
                    bodyRequest={saleBodyRequest}
                    entityName="venta"
                    id={formValues.id}
                    onCreateSuccess={getSales}
                >
                    <GenericInput label='Valor unitario' name='unitValue' type='number' value={formValues.unitValue} handleChange={handleChange} />
                    <GenericInput label='Cantidad' name='amount' type='number' value={formValues.amount} handleChange={handleChange} />
                    <GenericInput label='Método pago' name='paymentMethod' type='text' value={formValues.paymentMethod} handleChange={handleChange} />
                </GenericUpdate>
            }
        </div>
    )
}