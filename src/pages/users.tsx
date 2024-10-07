import { Filter } from "@/components/filter";
import { iUser } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";
import { useEffect, useState } from "react";

export default function Users() {

    const [message, setMessage] = useState<string>('')
    const [users, setUsers] = useState<iUser[]>([])
    async function getUsers() {
        const response = await Fetch.get('https://localhost:7274/api/Users')
        console.log(response)
        setUsers(response)
        response ?? setMessage('¡No se ha podido comunicar con la API!')
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="">
            <h1 className="text-2xl font-bold opacity-65">Usuarios del sistema</h1>
            <Filter />
            <table className="min-w-full">
                <thead className="opacity-90 bg-gray-200">
                    <tr>
                        <th className="p-2">Rut</th>
                        <th className="p-2">Correo</th>
                        <th className="p-2">Nombres</th>
                        <th className="p-2">Apellidos</th>
                        <th className="p-2">Fono</th>
                        <th className="p-2">Usuario</th>
                        <th className="p-2">Role</th>
                        <th className="p-2">Fecha creación</th>
                        <th className="p-2">Creado por</th>
                        <th className="p-2">Fecha ultima modificación</th>
                        <th className="p-2">Ultima modificación por</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    {users ?
                        users.map(i => (
                            <tr key={i.rut} className="text-center">
                                <td className="py-2 whitespace-nowrap">{i.rut}</td>
                                <td className="py-2 whitespace-nowrap">{i.email}</td>
                                <td className="py-2 whitespace-nowrap">{i.names}</td>
                                <td className="py-2 whitespace-nowrap">{i.surnames}</td>
                                <td className="py-2 whitespace-nowrap">{i.phone}</td>
                                <td className="py-2 whitespace-nowrap">{i.username}</td>
                                <td className="py-2 whitespace-nowrap">{i.roleName}</td>
                                <td className="py-2 whitespace-nowrap">{i.creationDate}</td>
                                <td className="py-2 whitespace-nowrap">{i.createdBy}</td>
                                <td className="py-2 whitespace-nowrap">{i.lastModificationDate}</td>
                                <td className="py-2 whitespace-nowrap">{i.lastModificationBy}</td>
                            </tr>
                        ))
                        :
                        <strong className="bg-red-500 p-2 rounded-md top-[70px] right-10 text-white absolute">{message}</strong>
                    }
                </tbody>
            </table>
        </div>
    )
}