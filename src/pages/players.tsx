import { PLAYER_INPUTS, PLAYER_LABELS } from "@/utils/tableFormat/tableFormats";
import { iPlayerBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericUpdate } from "@/components/crud/genericUpdate";
import { GenericRead } from "@/components/crud/genericRead";
import { useAuth } from "@/context/authContext";
import { iPlayer } from "@/interfaces/types";
import { useEffect, useState } from "react";
import { Fetch } from "@/utils/api/fetch";
import { PLAYER_COLUMNS } from "@/utils/tableFormat/columnsFormats";

export default function Players() {
    const { openModalCreate, openModalUpdate, handleOpenModalUpdate, filter } = useAuth();
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
        lastModificationBy: null
    });

    const playerBodyRequest: iPlayerBodyRequest = {
        rut: formValues.rut,
        email: formValues.email,
        names: formValues.names,
        surnames: formValues.surnames,
        phone: formValues.phone,
        banned: formValues.banned == 'true' ? true : false,
        createdBy: 'Chaleco',
        lastModificationBy: null
    }

    useEffect(() => {
        async function getPlayers() {
            try {
                const response = await Fetch.get('https://localhost:7274/api/Players')
                setPlayers(response)
            } catch (e) {
                console.error(e)
            }
        }

        getPlayers()
    }, [players])

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

    }, [filter, players]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

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
                        <td className="py-2 whitespace-nowrap">{i.creationDate}</td>
                        <td className="py-2 whitespace-nowrap">{i.createdBy}</td>
                        <td className="py-2 whitespace-nowrap">{i.banned ? 'Si' : 'No'}</td>
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
                                            banned: i.banned
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
                    url='https://localhost:7274/api/Players/CreatePlayer'
                    bodyRequest={playerBodyRequest}
                    inputsForm={PLAYER_INPUTS}
                    labelsForm={PLAYER_LABELS}
                    entityName='nuevo jugador'
                />
            }
            {
                openModalUpdate && <GenericUpdate
                    url={`https://localhost:7274/api/Players/UpdatePlayer/${formValues.rut}`}
                    bodyRequest={playerBodyRequest}
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
                        <label className="block" htmlFor={'banned'}>Estado</label>
                        <select
                            onChange={handleChange}
                            name='banned'
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