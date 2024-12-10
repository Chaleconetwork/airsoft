import { TEAM_COLUMNS } from "@/utils/tableFormat/columnsFormats";
import { iTeamBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericUpdate } from "@/components/crud/genericUpdate";
import { GenericRead } from "../components/crud/genericRead";
import { GenericInput } from "@/components/genericInput";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { iTeam } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";
import { useRouter } from "next/router";

export default function Teams() {
    const { openModalCreate, openModalUpdate, handleOpenModalUpdate, filter, pagination, isAuthenticated } = useAuth();
    const [filteredTeams, setFilteredTeams] = useState<iTeam[]>([]);
    const [teams, setTeams] = useState<iTeam[]>([])

    const [formValues, setFormValues] = useState<any>({
        id: '',
        teamName: '',
        createBy: '',
        lastModificationBy: null,
    });

    const teamBodyRequest: iTeamBodyRequest = {
        teamName: formValues.teamName,
        createdBy: 'Chaleco',
        lastModificationBy: null
    };

    if (openModalUpdate) {
        teamBodyRequest.id = parseInt(formValues.id)
    }

    async function getTeams() {
        const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Teams/GetTeams/${pagination}`)

        setTeams(response)
        setFilteredTeams(response); //
    }

    useEffect(() => {
        getTeams()
    }, [pagination])

    useEffect(() => {
        try {
            const filtered = teams.filter(team =>
                team.teamName!.toLowerCase().includes(filter.filter?.toLowerCase() || '')
            );

            setFilteredTeams(filtered);
        } catch (e) {
            console.error(e)
        }

    }, [filter, teams]);

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
        <div className="">
            <h1 className="text-2xl font-bold opacity-65">Equipos</h1>
            <GenericRead
                array={filteredTeams}
                headers={TEAM_COLUMNS}
                renderItem={(i) => (
                    <>
                        <td className="py-2 whitespace-nowrap">{i.id}</td>
                        <td className="py-2 whitespace-nowrap">{i.teamName}</td>
                        <td className="py-2 whitespace-nowrap">{i.creationDate}</td>
                        <td className="py-2 whitespace-nowrap">{i.createdBy}</td>
                        <td className="py-2 whitespace-nowrap">{i.lastModificationDate}</td>
                        <td className="py-2 whitespace-nowrap">{i.lastModificationBy}</td>
                        <td className="py-4 whitespace-nowrap">
                            <button
                                onClick={() => {
                                    handleOpenModalUpdate();
                                    setFormValues(
                                        {
                                            id: i.id,
                                            teamName: i.teamName,
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
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Teams/CreateTeam`}
                    bodyRequest={teamBodyRequest}
                    entityName='nuevo equipo'
                    onCreateSuccess={getTeams}
                >
                    <GenericInput label='Nombre del equipo' name='teamName' type='text' handleChange={handleChange} />
                </GenericCreate>
            }
            {
                openModalUpdate && <GenericUpdate
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Teams/UpdateTeam/${formValues.id}`}
                    bodyRequest={teamBodyRequest}
                    entityName="equipo"
                    id={formValues.id}
                    onCreateSuccess={getTeams}
                >
                    <GenericInput label='Nombre del equipo' name='teamName' type='text' value={formValues.teamName} handleChange={handleChange} />
                </GenericUpdate>
            }
        </div>
    )
}