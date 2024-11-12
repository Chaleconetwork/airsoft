import { USER_COLUMNS, USER_INPUTS, USER_LABELS } from "@/utils/tableFormat/tableFormats";
import { GenericCreate } from "@/components/crud/genericCreate";
import { iUserBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericRead } from "@/components/crud/genericRead";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { iUser } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";

export default function Users() {
    const [users, setUsers] = useState<iUser[]>([])
    const { openModalCreate, data } = useAuth();

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

    useEffect(() => {
        async function getUsers() {
            const response = await Fetch.get('https://localhost:7274/api/Users')
            setUsers(response)
        }
        
        getUsers()
    }, [users])

    return (
        <div className="">
            <h1 className="text-2xl font-bold opacity-65">Usuarios del sistema</h1>
            <GenericRead
                array={users}
                headers={USER_COLUMNS}
                renderItem={(item) => (
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
                )} />

            {
                openModalCreate && <GenericCreate
                    url='https://localhost:7274/api/Users/CreateUser'
                    bodyRequest={userBodyRequest} 
                    inputsForm={USER_INPUTS} 
                    labelsForm={USER_LABELS} 
                    entityName='nuevo usuario'
                 />
            }
        </div>
    )
}