import { PartyCard } from "@/components/cards/partyCard";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericInput } from "@/components/genericInput";
import { useAuth } from "@/context/authContext";
import { iGameBodyRequest } from "@/interfaces/bodyRequestType";
import { iField, iGame, iPlayer } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";
import { useEffect, useState } from "react";

export default function Games() {
    const [parties, setParties] = useState<Record<number, { team1: iPlayer[]; team2: iPlayer[] }>>({});
    const [games, setGames] = useState<iGame[]>([]);
    const [fields, setFields] = useState<iField[]>([]);

    const { openModalCreate, handleOpenModalCreate } = useAuth();

    const [formValues, setFormValues] = useState<any>({
        id: 0,
        fieldId: 0,
        createdBy: '',
        lastModificationBy: null,
    });

    const gameBodyRequest: iGameBodyRequest = {
        id: parseInt(formValues.id),
        fieldId: parseInt(formValues.fieldId),
        createdBy: 'Chaleco',
        lastModificationBy: null,
    }

    async function getFieldById(gameId: number) {
        try {
            const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Fields/GetFieldById/${gameId}`);
            setFields(response);
        } catch (e) {
            console.error(e);
        }
    }

    async function getFields() {
        try {
            const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Fields`);
            setFields(response);
        } catch (e) {
            console.error(e);
        }
    }

    async function getGames() {
        try {
            const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Games`);
            setGames(response);
        } catch (e) {
            console.error(e);
        }
    }

    async function getPlayers(teamId: number, gameId: number): Promise<iPlayer[]> {
        try {
            const response = await Fetch.get(
                `${process.env.NEXT_PUBLIC_API_URL}/Players/GetPlayerByTeamId/${teamId}/Game/${gameId}`
            );
            return response;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async function fetchPlayersForGame(gameId: number) {
        const team1Players = await getPlayers(1, gameId); // Equipo 1
        const team2Players = await getPlayers(2, gameId); // Equipo 2
       
        setParties(prev => ({
            ...prev,
            [gameId]: { team1: team1Players, team2: team2Players },
        }));
    }

    useEffect(() => {
        getFields()
        getGames();
    }, []);

    useEffect(() => {
        if (games.length > 0) {
            // Carga jugadores para cada juego
            games.forEach(game => {
                fetchPlayersForGame(game.id!);
            });
        }
    }, [games]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Fields`);
                setFields(response);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, []);
    
    const fieldMap = new Map((fields || []).map(field => [field.id, field.fieldName]));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold opacity-65 mb-4">Partidas</h1>
            <div className="flex justify-end items-center w-full border-t mb-6">
                <button onClick={handleOpenModalCreate} className="flex gap-4 items-center mt-2 p-8 py-2 border hover:bg-green-100 hover:shadow-md delay-100 duration-500 bg-green-200 text-green-600 rounded-xl">
                    Nueva partida
                </button>
            </div>
            <div>
                {games && games.length ? (
                    games.map(game => (
                        <PartyCard
                            key={game.id}
                            fieldName={fieldMap.get(game.fieldId) || "Unknown Field"}
                            team1={parties[game.id!]?.team1 || []}
                            team2={parties[game.id!]?.team2 || []}
                        />
                    ))
                ) : (
                    <p>No hay juegos disponibles</p> // Mensaje si no hay juegos
                )}
            </div>
            {
                openModalCreate && <GenericCreate
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Games/CreateGame`}
                    bodyRequest={gameBodyRequest}
                    entityName='nueva partida'
                    onCreateSuccess={getGames}
                    id={formValues.id}
                >
                    <GenericInput
                        label="Cancha"
                        name="fieldId"
                        type="number"
                        handleChange={handleChange}
                        options={fields.map(field => ({
                            label: field.fieldName,
                            value: field.id
                        }))}
                    />
                </GenericCreate>
            }
        </div>
    );
}
