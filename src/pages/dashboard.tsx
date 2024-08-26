import { Resume } from "@/components/dashboard/resume";

export default function Dashboard() {
    return (
        <div className="">
            <h1 className="text-2xl font-semibold opacity-65">Panel</h1>
            <section className="flex justify-between flex-wrap">
                <Resume title='Ventas' cant={20} color='' />
                <Resume title='Clientes' cant={80} color='' />
                <Resume title='Partidas' cant={2} color='' />
                <Resume title='Usuarios' cant={4} color='' />
                <Resume title='Canchas' cant={2} color='' />
            </section>
        </div>
    )
}