import { USER_COLUMNS } from "@/utils/tableFormat/columnsFormats";
import { GenericCreate } from "@/components/crud/genericCreate";
import { iUserBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericUpdate } from "@/components/crud/genericUpdate";
import { GenericRead } from "@/components/crud/genericRead";
import { GenericInput } from "@/components/genericInput";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { iUser } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";

export default function Users() {
    const [users, setUsers] = useState<iUser[]>([])
    const { openModalCreate, openModalUpdate, handleOpenModalUpdate, filter } = useAuth();
    const [filteredUsers, setFilteredUsers] = useState<iUser[]>([]);

    const [formValues, setFormValues] = useState<any>({
        rut: '',
        email: '',
        names: '',
        surnames: '',
        phone: '',
        username: '',
        password: '',
        status: '',
        roleId: 0,
        createdBy: '',
        lastModificationBy: null
    });

    const userBodyRequest: iUserBodyRequest = {
        email: formValues.email,
        names: formValues.names,
        surnames: formValues.surnames,
        phone: formValues.phone,
        username: formValues.username,
        status: formValues.status == 'true' ? true : false,
        roleId: parseInt(formValues.roleId),
        createdBy: 'Chaleco',
        lastModificationBy: null
    }

    if (openModalCreate) {
        userBodyRequest.password = formValues.password
        userBodyRequest.rut = formValues.rut
    }

    async function getUsers() {
        const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Users`)
        setUsers(response)
    }

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        try {
            const filtered = users.filter(user =>
                user.rut.toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                user.names!.toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                user.email!.toLowerCase().includes(filter.filter?.toLowerCase() || '')
            );

            setFilteredUsers(filtered);
        } catch (e) {
            console.error(e)
        }

    }, [filter, users]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    return (
        <div className="">
            <h1 className="text-2xl font-bold opacity-65">Usuarios del sistema</h1>
            <GenericRead
                array={filteredUsers}
                headers={USER_COLUMNS}
                renderItem={(i) => (
                    <>
                        <td className="py-4 whitespace-nowrap">{i.rut}</td>
                        <td className="py-4 whitespace-nowrap">{i.email}</td>
                        <td className="py-4 whitespace-nowrap">{i.names}</td>
                        <td className="py-4 whitespace-nowrap">{i.surnames}</td>
                        <td className="py-4 whitespace-nowrap">{i.phone}</td>
                        <td className="py-4 whitespace-nowrap">{i.username}</td>
                        <td className="py-4 whitespace-nowrap">{i.status ? 'Activo' : 'Desactivado'}</td>
                        <td className="py-4 whitespace-nowrap">{i.roleName}</td>
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
                                            username: i.username,
                                            status: i.status,
                                            roleId: i.roleName
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
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Users/CreateUser`}
                    bodyRequest={userBodyRequest}
                    entityName='nuevo usuario'
                    onCreateSuccess={getUsers}
                >
                    <div className="flex flex-col gap-2 mb-4">
                        <h4 className="font-semibold">Creando usuario: {formValues.rut}</h4>
                        <GenericInput label='Rut' name='rut' type='text' handleChange={handleChange} />
                        <GenericInput label='Correo' name='email' type='text' handleChange={handleChange} />
                        <GenericInput label='Nombres' name='names' type='text' handleChange={handleChange} />
                        <GenericInput label='Apellidos' name='surnames' type='text' handleChange={handleChange} />
                        <GenericInput label='Fono' name='phone' type='text' handleChange={handleChange} />
                        <GenericInput label='Nombre usuario' name='username' type='text' handleChange={handleChange} />
                        <GenericInput label='Contraseña' name='password' type='password' handleChange={handleChange} />
                        <GenericInput
                            label="Estado"
                            name="status"
                            type="text"
                            handleChange={handleChange}
                            options={[
                                { label: "Activo", value: "true" },
                                { label: "Desactivado", value: "false" }
                            ]}
                        />
                        <GenericInput
                            label="Role"
                            name="roleId"
                            type="number"
                            handleChange={handleChange}
                            options={[
                                { label: "Administrador", value: "1" },
                                { label: "Moderador", value: "2" }
                            ]}
                        />
                    </div>
                </GenericCreate>
            }
            {
                openModalUpdate && <GenericUpdate
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Users/UpdateUser/${formValues.rut}`}
                    bodyRequest={userBodyRequest}
                    entityName="usuario"
                    id={formValues.rut}
                    onCreateSuccess={getUsers}
                >
                    <div className="flex flex-col gap-2 mb-4">
                        <h4 className="font-semibold">Modificando usuario: {formValues.rut}</h4>
                        <GenericInput label='Correo' name='email' type='text' value={formValues.email} handleChange={handleChange} />
                        <GenericInput label='Nombres' name='names' type='text' value={formValues.names} handleChange={handleChange} />
                        <GenericInput label='Apellidos' name='surnames' type='text' value={formValues.surnames} handleChange={handleChange} />
                        <GenericInput label='Fono' name='phone' type='text' value={formValues.phone} handleChange={handleChange} />
                        <GenericInput label='Nombre usuario' name='username' type='text' value={formValues.username} handleChange={handleChange} />
                        <GenericInput
                            label="Estado"
                            name="status"
                            type="text"
                            value={formValues.status}
                            handleChange={handleChange}
                            options={[
                                { label: "Activo", value: "true" },
                                { label: "Desactivado", value: "false" }
                            ]}
                        />
                        <GenericInput
                            label="Role"
                            name="roleId"
                            type="number"
                            value={formValues.roleName}
                            handleChange={handleChange}
                            options={[
                                { label: "Administrador", value: 1 },
                                { label: "Moderador", value: 2 }
                            ]}
                        />
                    </div>
                </GenericUpdate>
            }
        </div>
    )
}