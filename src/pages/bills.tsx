import { BILL_COLUMNS } from "@/utils/tableFormat/columnsFormats";
import { iBillBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericUpdate } from "@/components/crud/genericUpdate";
import { GenericRead } from "@/components/crud/genericRead";
import { GenericInput } from "@/components/genericInput";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { iBill } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";

export default function Bills() {
    const { openModalCreate, openModalUpdate, handleOpenModalUpdate, filter, pagination } = useAuth();
    const [filteredBills, setFilteredBills] = useState<iBill[]>([]);
    const [bills, setBills] = useState<iBill[]>([])

    const [formValues, setFormValues] = useState<any>({
        id: '',
        product: '',
        unitValue: '',
        amount: '',
        supplier: '',
        createdBy: '',
        lastModificationBy: null
    });

    const billBodyRequest: iBillBodyRequest = {
        product: formValues.product,
        unitValue: parseInt(formValues.unitValue),
        amount: parseInt(formValues.amount),
        supplier: formValues.supplier,
        createdBy: 'Chaleco',
        lastModificationBy: null
    }

    async function getBills() {
        try {
            const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Bills/GetBills/${pagination}`)
            setBills(response)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getBills()
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
            const filtered = bills.filter(bill =>
                bill.id!.toString().toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                bill.product.toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                bill.unitValue!.toString().toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                bill.amount.toString().toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                bill.totalValue.toString().toLowerCase().includes(filter.filter?.toLowerCase() || '')
            );

            setFilteredBills(filtered);
        } catch (e) {
            console.error(e)
        }

    }, [filter, bills]);

    return (
        <div>
            <h1 className="text-2xl font-semibold opacity-65">Gastos</h1>
            <GenericRead
                array={filteredBills}
                headers={BILL_COLUMNS}
                renderItem={(i) => (
                    <>
                        <td className="py-4 whitespace-nowrap text-sm">{i.id}</td>
                        <td className="py-4 whitespace-nowrap text-sm">{i.product}</td>
                        <td className="py-4 whitespace-nowrap text-sm">${i.unitValue}</td>
                        <td className="py-4 whitespace-nowrap text-sm">{i.amount}</td>
                        <td className="py-4 whitespace-nowrap text-sm">${i.totalValue}</td>
                        <td className="py-4 whitespace-nowrap text-sm">{i.supplier}</td>
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
                                            product: i.product,
                                            unitValue: i.unitValue,
                                            amount: i.amount,
                                            totalValue: i.totalValue,
                                            supplier: i.supplier
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
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Bills/CreateBill`}
                    bodyRequest={billBodyRequest}
                    entityName='nuevo gasto'
                    onCreateSuccess={getBills}
                >
                    <GenericInput label='Producto' name='product' type='text' handleChange={handleChange} />
                    <GenericInput label='Valor unitario' name='unitValue' type='number' handleChange={handleChange} />
                    <GenericInput label='Cantidad' name='amount' type='number' handleChange={handleChange} />
                    <GenericInput label='Proveedor' name='supplier' type='text' handleChange={handleChange} />
                </GenericCreate>
            }
            {
                openModalUpdate && <GenericUpdate
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Bills/UpdateBill/${formValues.id}`}
                    bodyRequest={billBodyRequest}
                    entityName="gasto"
                    id={formValues.id}
                    onCreateSuccess={getBills}
                >
                    <GenericInput label='Producto' name='product' type='text' value={formValues.product} handleChange={handleChange} />
                    <GenericInput label='Valor unitario' name='unitValue' type='number' value={formValues.unitValue} handleChange={handleChange} />
                    <GenericInput label='Cantidad' name='amount' type='number' value={formValues.amount} handleChange={handleChange} />
                    <GenericInput label='Proveedor' name='supplier' type='text' value={formValues.supplier} handleChange={handleChange} />
                </GenericUpdate>
            }
        </div>
    )
}