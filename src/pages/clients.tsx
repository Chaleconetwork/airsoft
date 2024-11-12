import { CLIENT_COLUMNS, CLIENT_INPUTS, CLIENT_LABELS } from "@/utils/tableFormat/tableFormats";
import { iClientBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericRead } from "../components/crud/genericRead";
import { useAuth } from "@/context/authContext";
import { iClient } from "@/interfaces/types";
import { useEffect, useState } from "react";
import { Fetch } from "@/utils/api/fetch";
import { GenericUpdate } from "@/components/crud/genericUpdate";

export default function Clients() {
    const [clients, setClients] = useState<iClient[]>([])
    const { openModalCreate, openModalUpdate, data, filter } = useAuth();
    const [filteredClients, setFilteredClients] = useState<iClient[]>([]);

    const clientBodyRequest: iClientBodyRequest = {
        rut: data.rut,
        email: data.email,
        names: data.names,
        surnames: data.surnames,
        phone: data.phone,
        createdBy: 'Chaleco',
        lastModificationBy: null
    }

    useEffect(() => {
        async function getClients() {
            const response = await Fetch.get('https://localhost:7274/api/Clients')
            setClients(response)
            setFilteredClients(response); //
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
            console.error('AAAA')
        }

    }, [filter, clients]);

    return (
        <div className="">
            <h1 className="text-2xl font-bold opacity-65">Clientes</h1>
            <GenericRead
                array={filteredClients}
                headers={CLIENT_COLUMNS}
                renderItem={(item) => (
                    <>
                        <td className="py-2 whitespace-nowrap">{item.rut}</td>
                        <td className="py-2 whitespace-nowrap">{item.email}</td>
                        <td className="py-2 whitespace-nowrap">{item.names}</td>
                        <td className="py-2 whitespace-nowrap">{item.surnames}</td>
                        <td className="py-2 whitespace-nowrap">{item.phone}</td>
                        <td className="py-2 whitespace-nowrap">{item.creationDate}</td>
                        <td className="py-2 whitespace-nowrap">{item.createdBy}</td>
                        <td className="py-2 whitespace-nowrap">{item.lastModificationDate}</td>
                        <td className="py-2 whitespace-nowrap">{item.lastModificationBy}</td>
                    </>
                )}
            />

            {
                openModalCreate && <GenericCreate
                    url='https://localhost:7274/api/Clients/CreateClient'
                    bodyRequest={clientBodyRequest}
                    inputsForm={CLIENT_INPUTS}
                    labelsForm={CLIENT_LABELS}
                    entityName='nuevo cliente'
                />
            }
            {
                openModalUpdate && <GenericUpdate
                    url='https://localhost:7274/api/Clients/UpdateClient'
                    bodyRequest={clientBodyRequest}
                    inputsForm={CLIENT_INPUTS}
                    labelsForm={CLIENT_LABELS}
                    entityName='cliente'
                />
            }
        </div>
    )
}