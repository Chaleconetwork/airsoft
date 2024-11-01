import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericRead } from "@/components/crud/genericRead";
import { Filter } from "@/components/filter";
import { useAuth } from "@/context/authContext";
import { iUserBodyRequest } from "@/interfaces/bodyRequestType";
import { iUser } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";
import { useEffect, useState } from "react";

export default function Users() {

    const headers = ['Rut', 'Correo', 'Nombres', 'Apellidos', 'Fono', 'Usuario', 'Role', 'Fecha creación', 'Creado por', 'Fecha ultima modificación', 'Ultima modificación por']
    const labelsForm = ['Rut', 'Correo', 'Nombres', 'Apellidos', 'Fono', 'Usuario', 'Contraseña', 'Role']
    const inputsForm = ['rut', 'email', 'names', 'surnames', 'phone', 'username', 'password', 'roleId']

    const [users, setUsers] = useState<iUser[]>([])
    const [isClient, setIsClient] = useState(false);
    const { openModal, data } = useAuth();

    const userBodyRequest: iUserBodyRequest = {
        rut: data.rut,
        email: data.email,
        names: data.names,
        surnames: data.surnames,
        phone: data.phone,
        username: data.phone,
        password: data.password,
        roleId: parseInt(data.roleId),
        createdBy: 'Chaleco',
        lastModificationBy: null
    }

    // console.log('Testeando UserBodyRequest: ', userBodyRequest)

    useEffect(() => {
        setIsClient(true)
        async function getUsers() {
            const response = await Fetch.get('https://localhost:7274/api/Users')
            // console.log(response)
            setUsers(response)
        }
        
        if (users)
            getUsers()
    }, [users])

    if (!isClient)
        return null

    return (
        <div className="">
            <h1 className="text-2xl font-bold opacity-65">Usuarios del sistema</h1>
            <GenericRead
                array={users}
                headers={headers}
                renderItem={(item) => (
                    // <tr key={item.rut} className="text-center">
                    <>
                        <td className="py-2 whitespace-nowrap">{item.rut}</td>
                        <td className="py-2 whitespace-nowrap">{item.email}</td>
                        <td className="py-2 whitespace-nowrap">{item.names}</td>
                        <td className="py-2 whitespace-nowrap">{item.surnames}</td>
                        <td className="py-2 whitespace-nowrap">{item.phone}</td>
                        <td className="py-2 whitespace-nowrap">{item.username}</td>
                        <td className="py-2 whitespace-nowrap">{item.roleName}</td>
                        <td className="py-2 whitespace-nowrap">{item.creationDate}</td>
                        <td className="py-2 whitespace-nowrap">{item.createdBy}</td>
                        <td className="py-2 whitespace-nowrap">{item.lastModificationDate}</td>
                        <td className="py-2 whitespace-nowrap">{item.lastModificationBy}</td>
                    </>
                    // </tr>
                )} />

            {
                openModal && <GenericCreate
                    url='https://localhost:7274/api/Users/CreateUser'
                    entity={userBodyRequest} 
                    inputsForm={inputsForm} 
                    labelsForm={labelsForm} 
                    entityName='usuario'
                 />
            }
        </div>
    )
}