import { Kpi } from "@/components/charts/kpi";
import { useEffect, useState } from "react";
import { Fetch } from "@/utils/api/fetch";
import { MinorKpi } from "@/components/charts/minorKpi";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Registrar los elementos requeridos por Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {
    const [revenues, setRevenues] = useState<number>();
    const [expenses, setExpenses] = useState<number>();
    const [profit, setProfit] = useState<number>();
    const [bestClient, setBestClient] = useState<{ Rut: string, Names: string, TotalInverted: number }[]>([]);
    const [salesPeriod1, setSalesPeriod1] = useState<number[]>([]);
    const [salesPeriod2, setSalesPeriod2] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);

    useEffect(() => {
        async function getDashboard() {
            const responseRevenue = await Fetch.get(
                `${process.env.NEXT_PUBLIC_API_URL}/Dashboard/revenue`
            );
            setRevenues(responseRevenue);
            const responseExpenses = await Fetch.get(
                `${process.env.NEXT_PUBLIC_API_URL}/Dashboard/expenses`
            );
            setExpenses(responseExpenses);
            const responseProfit = await Fetch.get(
                `${process.env.NEXT_PUBLIC_API_URL}/Dashboard/profit`
            );
            setProfit(responseProfit);
            // const responseBestClients = await Fetch.get(
            //     `${process.env.NEXT_PUBLIC_API_URL}/Dashboard/top-clients`
            // );
            // console.log(responseBestClients)
            // setBestClient(responseBestClients);

            // Obtén los datos para los períodos de ventas
            const responseSales1 = await Fetch.get(
                `${process.env.NEXT_PUBLIC_API_URL}/Dashboard/salesPeriod1`
            );
            const responseSales2 = await Fetch.get(
                `${process.env.NEXT_PUBLIC_API_URL}/Dashboard/salesPeriod2`
            );
            const responseLabels = await Fetch.get(
                `${process.env.NEXT_PUBLIC_API_URL}/Dashboard/salesLabels`
            );

            setSalesPeriod1([10000, 20000, 30000, 50000, 55000, 60000, 75000, 80000, 85000, 100000, 120000, 150000]);
            setSalesPeriod2([120000, 130000, 140000, 150000, 180000, 190000, 200000, 210000, 250000, 260000, 270000, 275000]);
            setLabels(["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]); // Etiquetas para los ejes
        }

        getDashboard();
    }, []);

    // Datos para el gráfico
    const data = {
        labels: labels, // Etiquetas dinámicas
        datasets: [
            {
                label: "2023",
                data: salesPeriod1,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4, // Líneas suavizadas
            },
            {
                label: "2024",
                data: salesPeriod2,
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Comparación de Ventas por Período",
            },
        },
    };

    return (
        <div className="">
            <h1 className="text-2xl font-semibold opacity-65 mb-4">Panel</h1>
            <main className="">
                <section className="flex justify-between w-full gap-2 mb-4">
                    <Kpi value={revenues!} title="Ganancias" percentage={12} latest="últimos 7 días" />
                    <Kpi value={expenses!} title="Gastos" percentage={5} latest="últimos 7 días" />
                    <Kpi value={profit!} title="Beneficio" percentage={16} latest="últimos 7 días" />
                </section>
                <section className="flex flex-col gap-4">
                    <MinorKpi title="Mejores clientes" array={bestClient!} />
                    <MinorKpi title="Mejores jugadores"  />
                </section>
                <section className="mt-4">
                    <div className="w-full h-96 shadow-xl rounded-md pb-10 pt-4 px-4 bg-white">
                        <h2 className="text-gray-500 font-medium text-lg">Gráfico periodo de ventas</h2>
                        <Line data={data} options={options} />
                    </div>
                </section>
            </main>
        </div>
    );
}
