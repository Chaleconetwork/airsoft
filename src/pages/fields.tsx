import { FIELDS_COLUMNS } from "@/utils/tableFormat/columnsFormats";
import { iFieldBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericUpdate } from "@/components/crud/genericUpdate";
import { GenericRead } from "@/components/crud/genericRead";
import { GenericInput } from "@/components/genericInput";
import { useAuth } from "@/context/authContext";
import { iField } from "@/interfaces/types";
import { useEffect, useState } from "react";
import { Fetch } from "@/utils/api/fetch";
import { useRouter } from "next/router";

export default function Fields() {
    const { openModalCreate, openModalUpdate, handleOpenModalUpdate, filter, pagination, isAuthenticated, username } = useAuth();
    const [filteredFields, setFilteredFields] = useState<iField[]>([]);
    const [fields, setFields] = useState<iField[]>([])
    
    const initialFormValues = {
        id: '',
        reservationDateInit: '',
        reservationDateEnd: '',
        createdBy: '',
        lastModificationBy: ''
    };

    const [formValues, setFormValues] = useState<any>(initialFormValues);

    function formatDateForBackend(date: string): string | null {
        if (!date) return null;
        return new Date(date).toISOString();
    }

    const fieldBodyRequest: iFieldBodyRequest = {
        reservationDateInit: formValues.reservationDateInit === '' ? null : formatDateForBackend(formValues.reservationDateInit),
        reservationDateEnd: formValues.reservationDateEnd === '' ? null : formatDateForBackend(formValues.reservationDateEnd),
        createdBy: username,
        lastModificationBy: username
    }

    if (openModalUpdate) {
        fieldBodyRequest.id = parseInt(formValues.id)
    }

    async function getFields() {
        try {
            const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Fields/GetFields/${pagination}`)
            setFields(response)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getFields()
    }, [pagination])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    useEffect(() => {
        if (openModalCreate) {
            setFormValues(initialFormValues);
        }
    }, [openModalCreate]);

    useEffect(() => {
        try {
            const filtered = fields.filter(field =>
                field.id!.toString().toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                field.reservationDateInit!.toString().toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                field.reservationDateEnd!.toString().toLowerCase().includes(filter.filter?.toLowerCase() || '')
            );

            setFilteredFields(filtered);
        } catch (e) {
            console.error(e)
        }

    }, [filter, fields]);

    const router = useRouter();
    useEffect(()=>{
        if (!isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated])

    return (
        <div>
            <h1 className="text-2xl font-semibold opacity-65">Partidas</h1>
            <GenericRead
                array={filteredFields}
                headers={FIELDS_COLUMNS}
                renderItem={(i) => (
                    <>
                        <td className="py-4 whitespace-nowrap text-sm">{i.id}</td>
                        <td className="py-4 whitespace-nowrap text-sm">{i.reservationDateInit}</td>
                        <td className="py-4 whitespace-nowrap text-sm">{i.reservationDateEnd}</td>
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
                                            reservationDateInit: i.reservationDateInit,
                                            reservationDateEnd: i.reservationDateEnd,
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
                    entityName='nueva partida'
                    onCreateSuccess={getFields}
                >
                    <GenericInput
                        label="Fecha de inicio de reserva"
                        name="reservationDateInit"
                        type="datetime-local"
                        handleChange={handleChange}
                    />
                    <GenericInput
                        label="Fecha de fin de reserva"
                        name="reservationDateEnd"
                        type="datetime-local"
                        handleChange={handleChange}
                    />
                </GenericCreate>
            }
            {
                openModalUpdate && <GenericUpdate
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Fields/UpdateField/${formValues.id}`}
                    bodyRequest={fieldBodyRequest}
                    entityName="Partida"
                    id={formValues.id}
                    onCreateSuccess={getFields}
                >
                    <GenericInput
                        label="Fecha de inicio de reserva"
                        name="reservationDateInit"
                        type="datetime-local"
                        value={formValues.reservationDateInit}
                        handleChange={handleChange}
                    />
                    <GenericInput
                        label="Fecha de fin de reserva"
                        name="reservationDateEnd"
                        type="datetime-local"
                        value={formValues.reservationDateEnd}
                        handleChange={handleChange}
                    />
                </GenericUpdate>
            }
        </div>
    )
}