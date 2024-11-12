import { PLAYER_COLUMNS, PLAYER_INPUTS, PLAYER_LABELS, SALE_COLUMNS, SALE_INPUTS, SALE_LABELS } from "@/utils/tableFormat/tableFormats";
import { iPlayerBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericRead } from "@/components/crud/genericRead";
import { useAuth } from "@/context/authContext";
import { iPlayer } from "@/interfaces/types";
import { useEffect, useState } from "react";
import { Fetch } from "@/utils/api/fetch";
import { GenericUpdate } from "@/components/crud/genericUpdate";

export default function Players() {
    const [filteredPlayers, setFilteredPlayers] = useState<iPlayer[]>([]);
    const [players, setPlayers] = useState<iPlayer[]>([])

    const { openModalCreate, openModalUpdate, data, filter } = useAuth();

    const playerBodyRequest: iPlayerBodyRequest = {
        rut: data.rut,
        email: data.email,
        names: data.names,
        surnames: data.surnames,
        phone: data.phone,
        banned: false,
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
            console.error('AAAA')
        }

    }, [filter, players]);

    return (
        <div>
            <h1 className="text-2xl font-semibold opacity-65">Jugadores</h1>
            <GenericRead
                array={filteredPlayers}
                headers={PLAYER_COLUMNS}
                renderItem={(item) => (
                    <>
                        <td className="py-2 whitespace-nowrap">{item.rut}</td>
                        <td className="py-2 whitespace-nowrap">{item.email}</td>
                        <td className="py-2 whitespace-nowrap">{item.names}</td>
                        <td className="py-2 whitespace-nowrap">{item.surnames}</td>
                        <td className="py-2 whitespace-nowrap">{item.phone}</td>
                        <td className="py-2 whitespace-nowrap">{item.creationDate}</td>
                        <td className="py-2 whitespace-nowrap">{item.createdBy}</td>
                        <td className="py-2 whitespace-nowrap">{item.banned ? 'Si' : 'No'}</td>
                        <td className="py-2 whitespace-nowrap">{item.lastModificationDate}</td>
                        <td className="py-2 whitespace-nowrap">{item.lastModificationBy}</td>
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
                    url='https://localhost:7274/api/Players/UpdatePlayer'
                    bodyRequest={playerBodyRequest}
                    inputsForm={PLAYER_INPUTS}
                    labelsForm={PLAYER_LABELS}
                    entityName='jugador'
                />
            }
        </div>
    )
}