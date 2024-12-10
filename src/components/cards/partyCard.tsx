import { useEffect } from "react";

interface Props {
    fieldId: number;
    team1?: any[];
    team2?: any[];
    reservationDateInit?: string | null;
    reservationDateEnd?: string | null;
}

export const PartyCard = ({ fieldId, team1, team2, reservationDateInit, reservationDateEnd }: Props) => {
    useEffect(() => {
        
    }, [])
    return (
        <div className="mt-4">
            <div className="text-center bg-gray-600 text-gray-200 p-2 rounded-t">
                <h1 className="text-lg font-semibold">Partida {fieldId}</h1>
            </div>
            <div className="flex justify-center shadow-md max-h-[200px] min-h-[200px]">
                <div className="flex w-[50%] p-4 overflow-y-scroll">
                    <ul className="text-gray-600 font-medium">
                        <h3 className="text-center font-semibold mb-2">{team1![0]?.teamName}</h3>
                        {
                            team1!.map(team1 => (
                                <div key={team1.id} className="text-center">
                                    {team1.playerName}
                                </div>
                            ))
                        }
                    </ul>
                    <ul className="text-gray-600 font-medium w-full">
                        <h3 className="text-center font-semibold mb-2">{team2![0]?.teamName}</h3>
                        {
                            team2!.map(team2 => (
                                <div key={team2.id} className="text-center">
                                    {team2.playerName}
                                </div>
                            ))
                        }
                    </ul>
                </div>
                <ul className="border-l p-4">
                    <li><strong>Reservado para:</strong> {reservationDateInit}</li>
                    <li><strong>Reservado hasta:</strong> {reservationDateEnd}</li>
                    <li><strong>Encargado:</strong> {team1![0]?.createdBy}</li>
                </ul>
            </div>
        </div>
    )
}