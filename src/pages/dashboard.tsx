import { useEffect, useState } from "react";
import { Fetch } from "@/utils/api/fetch";
import Select from "@/components/select";
import { Chart } from "@/components/charts/chart";
import { Barchart } from "@/components/charts/barchart";

export default function Dashboard() {
    function handleChange() {

    }

    return (
        <div className="">
            <h1 className="text-2xl font-semibold opacity-65 mb-4">Panel</h1>
            {/* <div className="flex gap-2">
                <Select label='Año' onChange={handleChange} options={[{ value: '2024', label: '2024' }, { value: '2023', label: '2023' }]} value="Año" />
                <Select label='Mes' onChange={handleChange} options={[{ value: '1', label: 'Enero' }, { value: '2', label: 'Febrero' }]} value="Mes" />
                <Select label='Día' onChange={handleChange} options={[{ value: '1', label: '1' }, { value: '2', label: '2' }]} value="Dia" />
            </div> */}
            <main className="">
                <section className="flex justify-between w-full gap-2 mb-4">
                    <Chart value={7.895} title='Ganancias' percentage={12} latest="últimos 7 días" />
                    <Chart value={25.348} title='Gastos' percentage={5} latest="últimos 7 días" />
                    <Chart value={54.333} title='Pronóstico' percentage={16} latest="últimos 7 días" />
                </section>
                <section className="">
                    
                </section>
                <section className="flex flex-col gap-4">
                    <div className="bg-white shadow-xl rounded-md p-4">
                        <h4 className="text-gray-500 text-lg">Fecha</h4>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, eaque!
                        </p>
                    </div>
                    <div className="bg-white shadow-xl rounded-md p-4">
                        <h4 className="text-gray-500 text-lg">Pronósitco</h4>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, eaque!
                        </p>
                    </div>
                    <div className="bg-white shadow-xl rounded-md p-4">
                        <h4 className="text-gray-500 text-lg">Mejores clientes</h4>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, eaque!
                        </p>
                    </div>
                    <div className="bg-white shadow-xl rounded-md p-4">
                        <h4 className="text-gray-500 text-lg">Mejores jugadores</h4>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, eaque!
                        </p>
                    </div>
                </section>
            </main>
        </div>
    )
}