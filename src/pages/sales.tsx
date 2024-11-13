import { CREATE_SALE_INPUTS, CREATE_SALE_LABELS } from "@/utils/tableFormat/createInputFormats";
import { SALE_COLUMNS } from "@/utils/tableFormat/columnsFormats";
import { iSaleBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericUpdate } from "@/components/crud/genericUpdate";
import { GenericRead } from "@/components/crud/genericRead";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { iSale } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";

export default function Sales() {
    const { openModalCreate, openModalUpdate, data, handleOpenModalUpdate } = useAuth();
    const [userRut, setUserRut] = useState<string>('');
    const [sales, setSales] = useState<iSale[]>([])

    const [formValues, setFormValues] = useState<any>({
        id: '',
        unitValue: '',
        amount: '',
        userId: '',
        phone: '',
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
        console.log(formValues.unitValue)
        console.log(formValues.amo)
    }, [formValues])

    return (
        <div>
            <h1 className="text-2xl font-semibold opacity-65">Ventas</h1>
            <GenericRead
                array={sales}
                headers={SALE_COLUMNS}
                renderItem={(i) => (
                    <>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{i.id}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">${i.unitValue}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{i.amount}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">${i.totalValue}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{i.username}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{i.rutCliente}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{i.creationDate}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{i.createdBy}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{i.lastModificationDate}</td>
                        <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900">{i.lastModificationBy}</td>
                        <td className="py-2 whitespace-nowrap">
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
                    inputsForm={CREATE_SALE_INPUTS}
                    labelsForm={CREATE_SALE_LABELS}
                    entityName='nueva venta'
                />
            }
            {
                openModalUpdate && <GenericUpdate
                    url={`https://localhost:7274/api/Sales/UpdateSale/${formValues.id}`}
                    bodyRequest={saleBodyRequest}
                    entityName="venta"
                >
                    <div className="flex flex-col gap-2 mb-4">
                        <h4 className="font-semibold">Modificando venta: {formValues.id}</h4>
                        <label className="block" htmlFor={'unitValue'}>Valor unitario</label>
                        <input
                            onChange={handleChange}
                            name='unitValue'
                            type="text"
                            className="p-1.5 outline-none border w-full rounded-md"
                            placeholder="Campo obligatorio"
                            value={formValues.unitValue}
                        />
                        <label className="block" htmlFor={'amount'}>Cantidad</label>
                        <input
                            onChange={handleChange}
                            name='amount'
                            type="text"
                            className="p-1.5 outline-none border w-full rounded-md"
                            placeholder="Campo obligatorio"
                            value={formValues.amount}
                        />
                    </div>
                </GenericUpdate>
            }
        </div>
    )
}