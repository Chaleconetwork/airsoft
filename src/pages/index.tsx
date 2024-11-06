import { FieldCard } from "@/components/cards/fieldCard";

export default function Home() {
    return (
        <div className="mx-auto w-full">
            <header className="m-auto text-center h-full">
                <h1 className="text-5xl font-black pt-16 my-16">AIRSOFT</h1>
            </header>
            <main className="h-full bg-white p-4">
                <section>
                    <h2 className="text-2xl font-semibold text-center my-8">Eventos</h2>
                    <div className="flex justify-center gap-16">
                        <FieldCard title='Evento 1' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, voluptatum.' />
                        <FieldCard title='Evento 2' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, voluptatum.' />
                        <FieldCard title='Evento 3' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, voluptatum.' />
                    </div>
                </section>
                <section className="mt-16">
                    <h2 className="text-2xl font-semibold text-center my-8">Canchas</h2>
                    <div className="flex justify-center gap-16">
                        <FieldCard title='Cancha 1' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, voluptatum.' />
                        <FieldCard title='Cancha 2' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, voluptatum.' />
                        <FieldCard title='Cancha 3' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, voluptatum.' />
                    </div>
                </section>
            </main>
            <footer className="p-4">
                <h2 className="text-center">Todos los derechos reservados - 2024</h2>
            </footer>
        </div>
    );
}
