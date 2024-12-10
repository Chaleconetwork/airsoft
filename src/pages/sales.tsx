import { iClient, iPaymentMethod, iSale } from "@/interfaces/types";
import { SALE_COLUMNS } from "@/utils/tableFormat/columnsFormats";
import { iSaleBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericUpdate } from "@/components/crud/genericUpdate";
import { GenericRead } from "@/components/crud/genericRead";
import { GenericInput } from "@/components/genericInput";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { Fetch } from "@/utils/api/fetch";
import { useRouter } from "next/router";

export default function Sales() {
    const { openModalCreate, openModalUpdate, handleOpenModalUpdate, filter, pagination, isAuthenticated, username } = useAuth();
    const [paymentMethods, setPaymentMethods] = useState<iPaymentMethod[]>([])
    const [filteredSales, setFilteredSales] = useState<iSale[]>([]);
    const [sales, setSales] = useState<iSale[]>([])
    const [clients, setClients] = useState<iClient[]>([])

    const [formValues, setFormValues] = useState<any>({
        id: '',
        unitValue: '',
        amount: '',
        paymentMethodId: '',
        userId: '',
        rutClient: '',
        createdBy: '',
        lastModificationBy: ''
    });

    const saleBodyRequest: iSaleBodyRequest = {
        unitValue: parseInt(formValues.unitValue),
        amount: parseInt(formValues.amount),
        paymentMethodId: parseInt(formValues.paymentMethodId),
        rutClient: formValues.rutClient,
        createdBy: username,
        lastModificationBy: username
    }

    if (openModalUpdate) {
        saleBodyRequest.id = parseInt(formValues.id)
    }

    async function getSales() {
        try {
            const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Sales/GetSales/${pagination}`)
            setSales(response)
        } catch (e) {
            console.error(e)
        }
    }

    async function getPaymentMethod() {
        try {
            const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/PaymentMethod/GetPaymentMethods`);
            setPaymentMethods(response);
        } catch (e) {
            console.error(e);
        }
    }

    async function getClients() {
        try {
            const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Clients/GetClients`);
            setClients(response);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getClients()
        getPaymentMethod()
        getSales()
        console.log(clients)
    }, [pagination])

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

    const router = useRouter();
    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated])

    return (
        <div>
            <h1 className="text-2xl font-semibold opacity-65">Ventas</h1>
            <GenericRead
                array={filteredSales}
                headers={SALE_COLUMNS}
                renderItem={(i) => (
                    <>
                        <td className="py-4 whitespace-nowrap text-sm">{i.id}</td>
                        <td className="py-4 whitespace-nowrap text-sm">${i.unitValue}</td>
                        <td className="py-4 whitespace-nowrap text-sm">{i.amount}</td>
                        <td className="py-4 whitespace-nowrap text-sm">${i.totalValue}</td>
                        <td className="py-4 whitespace-nowrap text-sm">{i.paymentMethodName}</td>
                        <td className="py-4 whitespace-nowrap text-sm">{i.rutClient}</td>
                        <td className="py-4 whitespace-nowrap text-sm">{i.creationDate}</td>
                        <td className="py-4 whitespace-nowrap text-sm">{i.createdBy}</td>
                        <td className="py-4 whitespace-nowrap text-sm">{i.lastModificationDate}</td>
                        <td className="py-4 whitespace-nowrap text-sm">{i.lastModificationBy}</td>
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
                                            paymentMethodId: i.paymentMethodName,
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
                    <GenericInput
                        label="Cliente"
                        name="rutClient"
                        type="text"
                        required
                        handleChange={handleChange}
                        options={clients?.map(client => ({
                            label: client.rut,
                            value: client.rut
                        }))}
                    />
                    <GenericInput
                        label="Método de pago"
                        name="paymentMethodId"
                        type="number"
                        required
                        handleChange={handleChange}
                        options={paymentMethods?.map(paymentMethod => ({
                            label: paymentMethod.paymentMethodName,
                            value: paymentMethod.id
                        }))}
                    />
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
                    <GenericInput
                        label="Cliente"
                        name="rutClient"
                        type="text"
                        required
                        handleChange={handleChange}
                        value={formValues.rutClient}
                        options={clients?.map(client => ({
                            label: client.rut,
                            value: client.rut
                        }))}
                    />
                    <GenericInput
                        label="Método de pago"
                        name="paymentMethodId"
                        type="number"
                        handleChange={handleChange}
                        value={formValues.paymentMethodName}
                        options={paymentMethods?.map(paymentMethod => ({
                            label: paymentMethod.paymentMethodName,
                            value: paymentMethod.id
                        }))}
                    />
                </GenericUpdate>
            }
        </div>
    )
}