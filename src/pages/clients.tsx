import { useAuth } from "@/context/authContext";
import { GenericRead } from "../components/crud/genericRead";
import { Filter } from "@/components/filter";
import { iClient } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";
import { useEffect, useState } from "react";
import { GenericCreate } from "@/components/crud/genericCreate";

export default function Clients() {

    const headers = ['Rut', 'Correo', 'Nombres', 'Apellidos', 'Fono', 'Fecha creación', 'Creado por', 'Fecha ultima modificación', 'Ultima modificación por']
    const [clients, setClients] = useState<iClient[]>([])
    const [isClient, setIsClient] = useState(false);
    const { openModal } = useAuth();

    useEffect(() => {
        setIsClient(true)
        async function getClients() {
            const response = await Fetch.get('https://localhost:7274/api/Clients')
            // console.log(response)
            setClients(response)
        }

        if (clients)
            getClients()
    }, [clients])

    if (!isClient)
        return null

    return (
        <div className="">
            <h1 className="text-2xl font-bold opacity-65">Clientes</h1>
            <GenericRead
                array={clients}
                headers={headers}
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
                //   openModal && GenericCreate()
                }
        </div>
    )
}