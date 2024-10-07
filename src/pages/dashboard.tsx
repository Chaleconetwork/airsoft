import { GaugeChart } from "@/components/gaugeChart";
import { KPICard } from "@/components/KPICard";
import Select from "@/components/select";
import { Fetch } from "@/utils/api/fetch";
import { useEffect, useState } from "react";

export default function Dashboard() {
    function handleChange() {

    }

    const [usersCount, setUsersCount] = useState<number>(0)
    async function getCountUsers() {
        try {
            const response = await Fetch.get('https://localhost:7274/api/Users')
        setUsersCount(response.length)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCountUsers()
    }, [])

    return (
        <div className="flex flex-col h-full w-full">
            <h1 className="text-2xl font-semibold opacity-65 mb-4">Panel</h1>
            <div className="flex gap-2">
                <Select label='Año' onChange={handleChange} options={[{ value: '2024', label: '2024' }, { value: '2023', label: '2023' }]} value="Año" />
                <Select label='Mes' onChange={handleChange} options={[{ value: '1', label: 'Enero' }, { value: '2', label: 'Febrero' }]} value="Mes" />
                <Select label='Dia' onChange={handleChange} options={[{ value: '1', label: '1' }, { value: '2', label: '2' }]} value="Dia" />
            </div>
            <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
                <KPICard money={usersCount} title="Total ingresos" />
                <KPICard money={70} title="Total gastos" />
                <KPICard money={90} title="Total beneficio" />
                <KPICard money={90} title="% Margen" />
            </section>
            <main className="flex justify-between gap-2 grow">
                <section className="bg-white grow p-4 rounded-md border">
                    <h2 className="text-xl font-semibold">Total beneficio por mes</h2>
                </section>
                <section className="bg-white flex flex-col gap-2 p-4 rounded-md border">
                    <h2 className="text-xl font-semibold mb-4">Mejores clientes</h2>
                    <GaugeChart />
                    <GaugeChart />
                </section>
            </main>
        </div>
    )
}