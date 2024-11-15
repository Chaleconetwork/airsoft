import { FIELDS_COLUMNS, SALE_COLUMNS } from "@/utils/tableFormat/columnsFormats";
import { iFieldBodyRequest, iSaleBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericUpdate } from "@/components/crud/genericUpdate";
import { GenericRead } from "@/components/crud/genericRead";
import { GenericInput } from "@/components/genericInput";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { iField, iSale } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";

export default function Fields() {
    const { openModalCreate, openModalUpdate, handleOpenModalUpdate, filter } = useAuth();
    const [filteredFields, setFilteredFields] = useState<iField[]>([]);
    const [fields, setFields] = useState<iField[]>([])

    const [formValues, setFormValues] = useState<any>({
        id: '',
        fieldName: '',
        createdBy: '',
        lastModificationBy: null
    });

    const fieldBodyRequest: iFieldBodyRequest = {
        fieldName: formValues.fieldName,
        createdBy: 'Chaleco',
        lastModificationBy: null
    }

    if (openModalCreate) {
        fieldBodyRequest.id = parseInt(formValues.id)
    }

    useEffect(() => {
        async function getSales() {
            try {
                const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Fields`)
                setFields(response)
            } catch (e) {
                console.error(e)
            }
        }

        getSales()
    }, [fields])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    useEffect(() => {
        try {
            const filtered = fields.filter(field =>
                field.id!.toString().toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                field.fieldName!.toString().toLowerCase().includes(filter.filter?.toLowerCase() || '')
            );

            setFilteredFields(filtered);
        } catch (e) {
            console.error(e)
        }

    }, [filter, fields]);

    return (
        <div>
            <h1 className="text-2xl font-semibold opacity-65">Canchas</h1>
            <GenericRead
                array={filteredFields}
                headers={FIELDS_COLUMNS}
                renderItem={(i) => (
                    <>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.id}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.fieldName}</td>
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
                                            fieldName: i.fieldName,
                                            createdBy: 'Chaleco',
                                            lastModificationBy: null
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
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Fields/CreateField`}
                    bodyRequest={fieldBodyRequest}
                    entityName='nueva cancha'
                >
                    <GenericInput label='Cancha' name='fieldName' type='text' handleChange={handleChange} />                
                </GenericCreate>
            }
            {
                openModalUpdate && <GenericUpdate
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Fields/UpdateField/${formValues.id}`}
                    bodyRequest={fieldBodyRequest}
                    entityName="cancha"
                    id={formValues.id}
                >
                    <GenericInput label='Cancha' name='fieldName' type='text' value={formValues.fieldName} handleChange={handleChange} />                
                </GenericUpdate>
            }
        </div>
    )
}