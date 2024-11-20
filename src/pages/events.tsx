import { EVENTS_COLUMNS } from "@/utils/tableFormat/columnsFormats";
import { iEventBodyRequest } from "@/interfaces/bodyRequestType";
import { GenericCreate } from "@/components/crud/genericCreate";
import { GenericUpdate } from "@/components/crud/genericUpdate";
import { GenericRead } from "@/components/crud/genericRead";
import { GenericInput } from "@/components/genericInput";
import { useAuth } from "@/context/authContext";
import { iEvent } from "@/interfaces/types";
import { useEffect, useState } from "react";
import { Fetch } from "@/utils/api/fetch";
import { eventNames } from "process";

export default function Events() {
    const { openModalCreate, openModalUpdate, handleOpenModalUpdate, filter } = useAuth();
    const [filteredEvents, setFilteredEvents] = useState<iEvent[]>([]);
    const [eventss, setEventss] = useState<iEvent[]>([])

    const [formValues, setFormValues] = useState<any>({
        id: '',
        eventName: '',
        startDate: '',
        createdBy: '',
        lastModificationBy: null
    });

    const eventBodyRequest: iEventBodyRequest = {
        eventName: formValues.eventName,
        startDate: formValues.startDate,
        createdBy: 'Chaleco',
        lastModificationBy: null
    }

    if (openModalUpdate) {
        eventBodyRequest.id = parseInt(formValues.id)
    }

    async function getEvents() {
        try {
            const response = await Fetch.get(`${process.env.NEXT_PUBLIC_API_URL}/Events`)
            setEventss(response)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getEvents()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    useEffect(() => {
        try {
            const filtered = eventss.filter(e =>
                e.id!.toString().toLowerCase().includes(filter.filter?.toLowerCase() || '') ||
                e.eventName!.toString().toLowerCase().includes(filter.filter?.toLowerCase() || '')
            );

            setFilteredEvents(filtered);
        } catch (e) {
            console.error(e)
        }

    }, [filter, eventss]);

    return (
        <div>
            <h1 className="text-2xl font-semibold opacity-65">Canchas</h1>
            <GenericRead
                array={filteredEvents}
                headers={EVENTS_COLUMNS}
                renderItem={(i) => (
                    <>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.id}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.eventName}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.startDate}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.creationDate}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.createdBy}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.lastModificationDate}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.lastModificationBy}</td>
                        <td className="py-4 whitespace-nowrap">
                            <button
                                onClick={() => {
                                    handleOpenModalUpdate();
                                    setFormValues(
                                        {
                                            id: i.id,
                                            eventName: i.eventName,
                                            startDate: i.startDate,
                                            createdBy: 'Chaleco',
                                            lastModificationBy: null
                                        }
                                    )
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Editar
                            </button>
                        </td>
                    </>
                )} />

            {
                openModalCreate && <GenericCreate
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Events/CreateEvent`}
                    bodyRequest={eventBodyRequest}
                    entityName='nuevo evento'
                    onCreateSuccess={getEvents}
                >
                    {/* <GenericInput label='Id' name='id' type='number' handleChange={handleChange} /> */}
                    <GenericInput label='Evento' name='eventName' type='text' handleChange={handleChange} />
                    <GenericInput label='Fecha inicio' name='startDate' type='text' handleChange={handleChange} />
                </GenericCreate>
            }
            {
                openModalUpdate && <GenericUpdate
                    url={`${process.env.NEXT_PUBLIC_API_URL}/Events/UpdateEvent/${formValues.id}`}
                    bodyRequest={eventBodyRequest}
                    entityName="Evento"
                    id={formValues.id}
                    onCreateSuccess={getEvents}
                >
                    <GenericInput label='Evento' name='eventName' type='text' value={formValues.eventName} handleChange={handleChange} />
                    <GenericInput label='Fecha inicio' name='startDate' type='text' value={formValues.startDate} handleChange={handleChange} />

                </GenericUpdate>
            }
        </div>
    )
}