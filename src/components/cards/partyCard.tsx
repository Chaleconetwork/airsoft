import { useState, useEffect } from "react";
import { iPlayer } from "@/interfaces/types";

export interface Props {
    fieldName: string;
    team1: iPlayer[];
    team2: iPlayer[];
}

export const PartyCard = ({ fieldName, team1, team2 }: Props) => {
    const [timeElapsed, setTimeElapsed] = useState(0); // Time in seconds
    const [isRunning, setIsRunning] = useState(false);

    // Convert timeElapsed to minutes and seconds for display
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isRunning) {
            timer = setInterval(() => {
                setTimeElapsed((prev) => {
                    if (prev >= 30 * 60) {
                        clearInterval(timer!); // Stop the timer at 30 minutes
                        return prev;
                    }
                    return prev + 1; // Increment time by 1 second
                });
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer); // Cleanup on component unmount or when isRunning changes
        };
    }, [isRunning]);

    const handleStart = () => setIsRunning(true);
    const handleReset = () => {
        setIsRunning(false);
        setTimeElapsed(0);
    };

    return (
        <>
            <div className="flex shadow-lg rounded-md mb-2">
                <div className="bg-gray-600 min-w-[20%] text-white px-4 py-1 rounded-tl-md">
                    <ul className="flex flex-col items-center justify-center h-full">
                        <li className="text-2xl">{fieldName}</li>
                        <li className="text-3xl">Tiempo: ({formatTime(timeElapsed)})</li>
                    </ul>
                </div>
                <div className="flex gap-8 grow shadow-lg border p-4 w-full overflow-y-scroll max-h-[250px] min-h-[250px]">
                    {/* Listado de Team 1 */}
                    <ul className="text-gray-600 font-medium w-full">
                        <h3 className="text-center font-semibold mb-2">Equipo 1</h3>
                        {team1.map((player) => (
                            <li key={player.rut} className="border-b p-1.5 text-right text-blue-600">
                                {player.names}
                            </li>
                        ))}
                    </ul>
                    {/* Listado de Team 2 */}
                    <ul className="text-gray-600 font-medium w-full">
                        <h3 className="text-center font-semibold mb-2">Equipo 2</h3>
                        {team2.map((player) => (
                            <li key={player.rut} className="border-b p-1.5 text-left text-red-600">
                                {player.names}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col py-2 px-4 border-t gap-4 min-w-[20%]">
                    <div className="flex justify-end border-b pb-2">
                        <button className="px-3 py-1 bg-gray-200 hover:bg-gray-100 delay-100 duration-500 text-gray-600 rounded-full">
                            x
                        </button>
                    </div>
                    <div className="flex justify-around items-end grow">
                        <button
                            onClick={handleStart}
                            className="px-8 py-2 bg-gray-200 hover:bg-gray-100 delay-100 duration-500 text-gray-600 rounded-xl"
                            disabled={isRunning} // Disable the button if the timer is running
                        >
                            Iniciar
                        </button>
                        <button
                            onClick={handleReset}
                            className="px-8 py-2 bg-red-200 hover:bg-red-100 delay-100 duration-500 text-red-600 rounded-xl"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
