import { MinorKpi } from "@/components/charts/minorKpi";
import { Kpi } from "@/components/charts/kpi";
import { useEffect, useState } from "react";
import { Fetch } from "@/utils/api/fetch";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface SalesByMonthDto {
    month: number;
    totalSales: number;
}

export default function Dashboard() {
    const [bestClient, setBestClient] = useState<{ Rut: string, Names: string, TotalInverted: number }[]>([]);
    const [salesPeriod1, setSalesPeriod1] = useState<SalesByMonthDto[]>([]);
    const [salesPeriod2, setSalesPeriod2] = useState<SalesByMonthDto[]>([]);
    const [revenues, setRevenues] = useState<number>();
    const [labels, setLabels] = useState<string[]>([]);
    const [expenses, setExpenses] = useState<number>();
    const [profit, setProfit] = useState<number>();

    const allMonths = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

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
            const responseSales1: SalesByMonthDto[] = await Fetch.get(
                `${process.env.NEXT_PUBLIC_API_URL}/Dashboard/salesPeriod1`
            );
            console.log("Ventas Periodo 1:", responseSales1);
            setSalesPeriod1(responseSales1);

            const responseSales2: SalesByMonthDto[] = await Fetch.get(
                `${process.env.NEXT_PUBLIC_API_URL}/Dashboard/salesPeriod2`
            );
            console.log("Ventas Periodo 2:", responseSales2);
            setSalesPeriod2(responseSales2);

            const monthsPeriod1 = responseSales1.map((item) => allMonths[item.month - 1]);
            const monthsPeriod2 = responseSales2.map((item) => allMonths[item.month - 1]);
            const allMonthsSet = new Set([...monthsPeriod1, ...monthsPeriod2]);

            setLabels(Array.from(allMonthsSet));
        }

        getDashboard();
    }, []);

    const data = {
        labels: labels,
        datasets: [
            {
                label: "2023",
                data: labels.map((label) => {
                    const sales = salesPeriod1.find((item) => allMonths[item.month - 1] === label);
                    return sales ? sales.totalSales : 0;
                }),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
            },
            {
                label: "2024",
                data: labels.map((label) => {
                    const sales = salesPeriod2.find((item) => allMonths[item.month - 1] === label);
                    return sales ? sales.totalSales : 0;
                }),
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
                    <MinorKpi title="Mejores jugadores" />
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
