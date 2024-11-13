import { CREATE_TEAM_INPUTS, CREATE_TEAM_LABELS } from "@/utils/tableFormat/createInputFormats";
import { TEAM_COLUMNS } from "@/utils/tableFormat/columnsFormats";
import { iTeamBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericRead } from "../components/crud/genericRead";
import { useAuth } from "@/context/authContext";
import { iTeam } from "@/interfaces/types";
import { useEffect, useState } from "react";
import { Fetch } from "@/utils/api/fetch";

export default function Teams() {
    const [teams, setTeams] = useState<iTeam[]>([])
    const { openModalCreate, openModalUpdate, data, filter } = useAuth();
    const [filteredTeams, setFilteredTeams] = useState<iTeam[]>([]);

    const teamBodyRequest: Partial<iTeamBodyRequest> = {
        teamName: data.teamName,
        createdBy: 'Chaleco',
        lastModificationBy: null,
    };
    
    if (openModalUpdate) {
        teamBodyRequest.id = parseInt(data.id) ? parseInt(data.id) : null;
    }

    useEffect(() => {
        async function getTeams() {
            const response = await Fetch.get('https://localhost:7274/api/Teams')
            setTeams(response)
            setFilteredTeams(response); //
        }
        // console.log(teamBodyRequest)
        getTeams()
    }, [teams])

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

    return (
        <div className="">
            <h1 className="text-2xl font-bold opacity-65">Equipos</h1>
            <GenericRead
                array={filteredTeams}
                headers={TEAM_COLUMNS}
                renderItem={(item) => (
                    <>
                        <td className="py-2 whitespace-nowrap">{item.id}</td>
                        <td className="py-2 whitespace-nowrap">{item.teamName}</td>
                        <td className="py-2 whitespace-nowrap">{item.creationDate}</td>
                        <td className="py-2 whitespace-nowrap">{item.createdBy}</td>
                        <td className="py-2 whitespace-nowrap">{item.lastModificationDate}</td>
                        <td className="py-2 whitespace-nowrap">{item.lastModificationBy}</td>
                    </>
                )}
            />

            {
                openModalCreate && <GenericCreate
                    url='https://localhost:7274/api/Teams/CreateTeam'
                    bodyRequest={teamBodyRequest}
                    inputsForm={CREATE_TEAM_INPUTS}
                    labelsForm={CREATE_TEAM_LABELS}
                    entityName='nuevo equipo'
                />
            }
        </div>
    )
}