import { USER_INPUTS, USER_LABELS } from "@/utils/tableFormat/tableFormats";
import { USER_COLUMNS } from "@/utils/tableFormat/columnsFormats";
import { GenericCreate } from "@/components/crud/genericCreate";
import { iUserBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericUpdate } from "@/components/crud/genericUpdate";
import { GenericRead } from "@/components/crud/genericRead";
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
        roleId: 0,
        status: '',
        createdBy: '',
        lastModificationBy: null
    });

    const userBodyRequest: iUserBodyRequest = {
        rut: formValues.rut,
        email: formValues.email,
        names: formValues.names,
        surnames: formValues.surnames,
        phone: formValues.phone,
        username: formValues.phone,
        password: formValues.password,
        roleId: parseInt(formValues.roleId),
        status: formValues.status,
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
                        <td className="py-2 whitespace-nowrap">{i.rut}</td>
                        <td className="py-2 whitespace-nowrap">{i.email}</td>
                        <td className="py-2 whitespace-nowrap">{i.names}</td>
                        <td className="py-2 whitespace-nowrap">{i.surnames}</td>
                        <td className="py-2 whitespace-nowrap">{i.phone}</td>
                        <td className="py-2 whitespace-nowrap">{i.username}</td>
                        <td className="py-2 whitespace-nowrap">{i.roleName}</td>
                        <td className="py-2 whitespace-nowrap">{i.status}</td>
                        <td className="py-2 whitespace-nowrap">{i.creationDate}</td>
                        <td className="py-2 whitespace-nowrap">{i.createdBy}</td>
                        <td className="py-2 whitespace-nowrap">{i.lastModificationDate}</td>
                        <td className="py-2 whitespace-nowrap">{i.lastModificationBy}</td>
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
            {
                openModalUpdate && <GenericUpdate
                    url={`https://localhost:7274/api/Players/UpdatePlayer/${formValues.rut}`}
                    bodyRequest={userBodyRequest}
                    entityName="cliente"
                >
                    <div className="flex flex-col gap-2 mb-4">
                        <h4 className="font-semibold">Modificando cliente: {formValues.rut}</h4>
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
                        <label className="block" htmlFor={'status'}>Estado</label>
                        <select
                            onChange={handleChange}
                            name='status'
                            className="p-1.5 outline-none border w-full rounded-md"
                            value={formValues.status}
                        >
                            <option value="">Selecciona una opción</option>
                            <option value='true'>Si</option>
                            <option value='false'>No</option>
                        </select>
                    </div>
                </GenericUpdate>
            }
        </div>
    )
}