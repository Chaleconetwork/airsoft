import { CLIENT_COLUMNS, CLIENT_INPUTS, CLIENT_LABELS } from "@/utils/tableFormat/tableFormats";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericRead } from "../components/crud/genericRead";
import { useAuth } from "@/context/authContext";
import { iClient } from "@/interfaces/types";
import { useEffect, useState } from "react";
import { Fetch } from "@/utils/api/fetch";

export default function Clients() {
    const [clients, setClients] = useState<iClient[]>([])
    const { openModal } = useAuth();

    useEffect(() => {
        async function getClients() {
            const response = await Fetch.get('https://localhost:7274/api/Clients')
            setClients(response)
        }

        getClients()
    }, [clients])

    return (
        <div className="">
            <h1 className="text-2xl font-bold opacity-65">Clientes</h1>
            <GenericRead
                array={clients}
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
                )} />

            {
                openModal && <GenericCreate
                    url='https://localhost:7274/api/Clients/CreateClient'
                    entity={0}
                    inputsForm={CLIENT_INPUTS}
                    labelsForm={CLIENT_LABELS}
                    entityName='nuevo cliente'
                />
            }
        </div>
    )
}