import { PLAYER_COLUMNS } from "@/utils/tableFormat/columnsFormats";
import { iPlayerBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericUpdate } from "@/components/crud/genericUpdate";
import { GenericRead } from "@/components/crud/genericRead";
import { GenericInput } from "@/components/genericInput";
import { useAuth } from "@/context/authContext";
import { iPlayer, iTeam } from "@/interfaces/types";
import { useEffect, useState } from "react";
import { Fetch } from "@/utils/api/fetch";
import { useRouter } from "next/router";

export default function Players() {
    const { openModalCreate, openModalUpdate, handleOpenModalUpdate, filter, pagination, isAuthenticated } = useAuth();
    const [filteredPlayers, setFilteredPlayers] = useState<iPlayer[]>([]);
    const [players, setPlayers] = useState<iPlayer[]>([])

    const [formValues, setFormValues] = useState<any>({
        rut: '',
        email: '',
        names: '',
        surnames: '',
        phone: '',
        banned: false,
        createdBy: '',
        lastModificationBy: null,
        teamName: ''
    });

    const playerBodyRequest: iPlayerBodyRequest = {
        rut: formValues.rut,
        email: formValues.email,
        names: formValues.names,
        surnames: formValues.surnames,
        phone: formValues.phone,
        banned: formValues.banned == 1 ? true : false,
        createdBy: 'Chaleco',
        lastModificationBy: null,
    }

    async function getPlayers() {
        try {
            const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Players/GetPlayers/${pagination}`)
            setPlayers(response)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getPlayers()
    }, [pagination])

    useEffect(() => {
        try {
            const filtered = players.filter(player =>
                player.names!.toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                player.email!.toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                player.rut.toLowerCase().includes(filter.filter?.toLowerCase() || '')
            );

            setFilteredPlayers(filtered);
        } catch (e) {
            console.error(e)
        }
        console.log('Test teamId: ', formValues.teamId)
    }, [filter, players]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const router = useRouter();
    useEffect(()=>{
        if (!isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated])

    return (
        <div>
            <h1 className="text-2xl font-semibold opacity-65">Jugadores</h1>
            <GenericRead
                array={filteredPlayers}
                headers={PLAYER_COLUMNS}
                renderItem={(i) => (
                    <>
                        <td className="py-2 whitespace-nowrap">{i.rut}</td>
                        <td className="py-2 whitespace-nowrap">{i.email}</td>
                        <td className="py-2 whitespace-nowrap">{i.names}</td>
                        <td className="py-2 whitespace-nowrap">{i.surnames}</td>
                        <td className="py-2 whitespace-nowrap">{i.phone}</td>
                        <td className="py-2 whitespace-nowrap">{i.banned ? 'Si' : 'No'}</td>
                        <td className="py-2 whitespace-nowrap">{i.creationDate}</td>
                        <td className="py-2 whitespace-nowrap">{i.createdBy}</td>
                        <td className="py-2 whitespace-nowrap">{i.lastModificationDate}</td>
                        <td className="py-2 whitespace-nowrap">{i.lastModificationBy}</td>
                        <td className="py-2 whitespace-nowrap">
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
                                            banned: i.banned,
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
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Players/CreatePlayer`}
                    bodyRequest={playerBodyRequest}
                    entityName='nuevo jugador'
                    onCreateSuccess={getPlayers}
                    id={formValues.rut}
                >
                    <GenericInput label='Rut' name='rut' type='text' handleChange={handleChange} />
                    <GenericInput label='Correo' name='email' type='text' handleChange={handleChange} />
                    <GenericInput label='Nombres' name='names' type='text' handleChange={handleChange} />
                    <GenericInput label='Apellidos' name='surnames' type='text' handleChange={handleChange} />
                    <GenericInput label='Fono' name='phone' type='text' handleChange={handleChange} />
                    <GenericInput
                        label="Estado inicial"
                        name="banned"
                        type="text"
                        handleChange={handleChange}
                        options={[
                            { label: "Activo", value: "true" },
                            { label: "Desactivado", value: "false" }
                        ]}
                    />
                </GenericCreate>
            }
            {
                openModalUpdate && <GenericUpdate
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Players/UpdatePlayer/${formValues.rut}`}
                    bodyRequest={playerBodyRequest}
                    entityName="jugador"
                    id={formValues.rut}
                    onCreateSuccess={getPlayers}
                >
                    <div className="flex flex-col gap-2 mb-4">
                        <GenericInput label='Rut' name='rut' type='text' value={formValues.rut} handleChange={handleChange} />
                        <GenericInput label='Correo' name='email' type='text' value={formValues.email} handleChange={handleChange} />
                        <GenericInput label='Nombres' name='names' type='text' value={formValues.names} handleChange={handleChange} />
                        <GenericInput label='Apellidos' name='surnames' type='text' value={formValues.surnames} handleChange={handleChange} />
                        <GenericInput label='Fono' name='phone' type='text' value={formValues.phone} handleChange={handleChange} />
                        <GenericInput
                            label="¿Banear jugador?"
                            name="banned"
                            type="text"
                            // required={true}
                            handleChange={handleChange}
                            value={formValues.banned}
                            options={[
                                { label: "Si", value: 1 },
                                { label: "No", value: 0 }
                            ]}
                        />
                    </div>
                </GenericUpdate>
            }
        </div>
    )
}