import { iPlayerGameBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { iField, iPlayer, iPlayerGame, iTeam } from "@/interfaces/types";
import { GenericInput } from "@/components/genericInput";
import { PartyCard } from "@/components/cards/partyCard";
import { Pagination } from "@/components/pagination";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { Fetch } from "@/utils/api/fetch";
import { useRouter } from "next/router";

interface TeamProps {
    id: number;
    playerRut: string;
    playerName: string;
    teamName: string;
    fieldName: string;
    CreationDate: string;
    CreatedBy: string;
    reservationDateInit: string;
    reservationDateEnd: string;
}

export default function Games() {
    const [teamsByGame, setTeamsByGame] = useState<Record<number, { team1: TeamProps[], team2: TeamProps[] }>>({});
    const [players, setPlayers] = useState<iPlayer[]>([]);
    const [fields, setFields] = useState<iField[]>([]);
    const [teams, setTeams] = useState<iTeam[]>([]);
    const [parties, setParties] = useState<iField[]>([]);

    const { openModalCreate, handleOpenModalCreate, pagination, isAuthenticated } = useAuth();

    const [formValues, setFormValues] = useState<any>({
        id: 0,
        playerRut: '',
        fieldId: 0,
        teamId: 0,
        createdBy: '',
        lastModificationBy: null,
    });

    const playerGameBodyRequest: iPlayerGameBodyRequest = {
        id: parseInt(formValues.id),
        fieldId: parseInt(formValues.fieldId),
        playerRut: formValues.playerRut,
        teamId: parseInt(formValues.teamId),
        createdBy: 'Chaleco',
        lastModificationBy: null,
    }

    async function getFields() {
        try {
            // const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Fields/GetFields`);
            const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Fields/GetFields`);
            setFields(response);
        } catch (e) {
            console.error(e);
        }
    }

    async function getParties() {
        try {
            // const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Fields/GetFields`);
            const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Fields/GetFieldsTwo/${pagination}`);
            setParties(response);
        } catch (e) {
            console.error(e);
        }
    }

    async function getPlayers() {
        try {
            const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Players/GetPlayers`);
            setPlayers(response);
        } catch (e) {
            console.error(e);
        }
    }

    async function getTeams() {
        try {
            const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Teams/GetTeams`);
            setTeams(response);
        } catch (e) {
            console.error(e);
        }
    }
    
    async function getPlayersByGame(fieldId: number) {
        try {
            const responseTeam1 = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/PlayerGames/GetPlayersByGame/${fieldId}/${1}`);
            const responseTeam2 = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/PlayerGames/GetPlayersByGame/${fieldId}/${2}`);

            setTeamsByGame(prevState => ({
                ...prevState,
                [fieldId]: {
                    team1: responseTeam1,
                    team2: responseTeam2
                }
            }));
        } catch (e) {
            console.error(e);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    useEffect(() => {
        parties.forEach(i => {
            getPlayersByGame(i.id)
        })
        
        getFields()
        getPlayers()
        getTeams()
    }, [parties]);

    useEffect(() => {
        getParties()
    }, [pagination])

    const router = useRouter();
    useEffect(()=>{
        if (!isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated])

    return (
        <div>
            <h1 className="text-2xl font-semibold opacity-65 mb-4">Partidas</h1>
            <div className="flex justify-end items-center w-full">
                <button onClick={handleOpenModalCreate} className="flex gap-4 items-center px-8 py-2 border hover:bg-green-100 hover:shadow-md delay-100 duration-500 bg-green-200 text-green-600 rounded-xl">
                    Agregar jugadores
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4 grow p-4">
                {
                    parties.map(party => (
                        <PartyCard
                            key={party.id}
                            fieldId={party.id}
                            team1={teamsByGame[party.id]?.team1 || []}
                            team2={teamsByGame[party.id]?.team2 || []}
                            reservationDateInit={party.reservationDateInit}
                            reservationDateEnd={party.reservationDateEnd}
                        />
                    ))
                }
            </div>
            {
                openModalCreate && <GenericCreate
                    url={`${process.env.NEXT_PUBLIC_API_URL}/PlayerGames/CreatePlayerGame`}
                    bodyRequest={playerGameBodyRequest}
                    entityName='nueva partida'
                    onCreateSuccess={getParties}
                    id={formValues.id}
                >
                    <GenericInput
                        label="Rut jugador"
                        name="playerRut"
                        type="text"
                        required
                        handleChange={handleChange}
                        options={players?.map(player => ({
                            label: player.rut,
                            value: player.rut
                        }))}
                    />
                    <GenericInput
                        label="Equipo"
                        name="teamId"
                        type="number"
                        required
                        handleChange={handleChange}
                        options={teams?.map(team => ({
                            label: team.teamName,
                            value: team.id
                        }))}
                    />
                    <GenericInput
                        label="Partida"
                        name="fieldId"
                        type="number"
                        required
                        handleChange={handleChange}
                        options={fields?.map(field => ({
                            label: field.id.toString(),
                            value: field.id
                        }))}
                    />
                </GenericCreate>
            }
            <div>
                <Pagination />
            </div>
        </div>
    );
}
