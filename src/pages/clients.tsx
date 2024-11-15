import { CLIENT_COLUMNS } from "@/utils/tableFormat/columnsFormats";
import { iClientBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericUpdate } from "@/components/crud/genericUpdate";
import { GenericRead } from "../components/crud/genericRead";
import { useAuth } from "@/context/authContext";
import { iClient } from "@/interfaces/types";
import { useEffect, useState } from "react";
import { Fetch } from "@/utils/api/fetch";

export default function Clients() {
    const { openModalCreate, openModalUpdate, handleOpenModalUpdate, filter } = useAuth();
    const [filteredClients, setFilteredClients] = useState<iClient[]>([]);
    const [clients, setClients] = useState<iClient[]>([])

    const [formValues, setFormValues] = useState<any>({
        rut: '',
        email: '',
        names: '',
        surnames: '',
        phone: '',
        createdBy: '',
        lastModificationBy: null
    });

    const clientBodyRequest: iClientBodyRequest = {
        email: formValues.email,
        names: formValues.names,
        surnames: formValues.surnames,
        phone: formValues.phone,
        createdBy: 'Chaleco',
        lastModificationBy: null
    }

    if (openModalCreate) {
        clientBodyRequest.rut = formValues.rut
    }

    useEffect(() => {
        async function getClients() {
            const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Clients`)
            setClients(response)
        }

        getClients()
    }, [clients])

    useEffect(() => {
        try {
            const filtered = clients.filter(client =>
                client.names!.toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                client.email!.toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                client.rut.toLowerCase().includes(filter.filter?.toLowerCase() || '')
            );

            setFilteredClients(filtered);
        } catch (e) {
            console.error('')
        }

    }, [filter, clients]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    return (
        <div className="">
            <h1 className="text-2xl font-bold opacity-65">Clientes</h1>
            <GenericRead
                array={filteredClients}
                headers={CLIENT_COLUMNS}
                renderItem={(i) => (
                    <>
                        <td className="py-4 whitespace-nowrap">{i.rut}</td>
                        <td className="py-4 whitespace-nowrap">{i.email}</td>
                        <td className="py-4 whitespace-nowrap">{i.names}</td>
                        <td className="py-4 whitespace-nowrap">{i.surnames}</td>
                        <td className="py-4 whitespace-nowrap">{i.phone}</td>
                        <td className="py-4 whitespace-nowrap">{i.creationDate}</td>
                        <td className="py-4 whitespace-nowrap">{i.createdBy}</td>
                        <td className="py-4 whitespace-nowrap">{i.lastModificationDate}</td>
                        <td className="py-4 whitespace-nowrap">{i.lastModificationBy}</td>
                        <td className="py-4 whitespace-nowrap">
                            <button
                                onClick={() => {
                                    handleOpenModalUpdate();
                                    setFormValues(
                                        {
                                            rut: i.rut,
                                            email: i.email,
                                            names: i.names,
                                            surnames: i.surnames,
                                            phone: i.phone,
                                        }
                                    )
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Editar
                            </button>
                        </td>
                    </>
                )}
            />
            {
                openModalCreate && <GenericCreate
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Clients/CreateClient`}
                    bodyRequest={clientBodyRequest}
                    entityName='nuevo cliente'
                >
                    <div className="flex flex-col gap-2 mb-4">
                        <label className="block" htmlFor={'rut'}>Rut</label>
                        <input
                            onChange={handleChange}
                            name='rut'
                            type="text"
                            className="p-1.5 outline-none border w-full rounded-md"
                            placeholder="Campo obligatorio"
                        />
                        <label className="block" htmlFor={'email'}>Correo</label>
                        <input
                            onChange={handleChange}
                            name='email'
                            type="text"
                            className="p-1.5 outline-none border w-full rounded-md"
                            placeholder="Campo obligatorio"
                        />
                        <label className="block" htmlFor={'names'}>Nombres</label>
                        <input
                            onChange={handleChange}
                            name='names'
                            type="text"
                            className="p-1.5 outline-none border w-full rounded-md"
                            placeholder="Campo obligatorio"
                        />
                        <label className="block" htmlFor={'surnames'}>Apellidos</label>
                        <input
                            onChange={handleChange}
                            name='surnames'
                            type="text"
                            className="p-1.5 outline-none border w-full rounded-md"
                            placeholder="Campo obligatorio"
                        />
                        <label className="block" htmlFor={'phone'}>Fono</label>
                        <input
                            onChange={handleChange}
                            name='phone'
                            type="text"
                            className="p-1.5 outline-none border w-full rounded-md"
                            placeholder="Campo obligatorio"
                        />
                    </div>
                </GenericCreate>
            }
            {
                openModalUpdate && <GenericUpdate
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Clients/UpdateClient/${formValues.rut}`}
                    bodyRequest={clientBodyRequest}
                    entityName="cliente"
                    id={formValues.rut}
                >
                    <div className="flex flex-col gap-2 mb-4">
                        <label className="block" htmlFor={'email'}>Correo</label>
                        <input
                            onChange={handleChange}
                            name='email'
                            type="text"
                            className="p-1.5 outline-none border w-full rounded-md"
                            placeholder="Campo obligatorio"
                            value={formValues.email}
                        />
                        <label className="block" htmlFor={'names'}>Nombres</label>
                        <input
                            onChange={handleChange}
                            name='names'
                            type="text"
                            className="p-1.5 outline-none border w-full rounded-md"
                            placeholder="Campo obligatorio"
                            value={formValues.names}
                        />
                        <label className="block" htmlFor={'surnames'}>Apellidos</label>
                        <input
                            onChange={handleChange}
                            name='surnames'
                            type="text"
                            className="p-1.5 outline-none border w-full rounded-md"
                            placeholder="Campo obligatorio"
                            value={formValues.surnames}
                        />
                        <label className="block" htmlFor={'phone'}>Fono</label>
                        <input
                            onChange={handleChange}
                            name='phone'
                            type="text"
                            className="p-1.5 outline-none border w-full rounded-md"
                            placeholder="Campo obligatorio"
                            value={formValues.phone}
                        />
                    </div>
                </GenericUpdate>
            }
        </div>
    )
}