import { PriceCard } from "@/components/prices/priceCard";
import Image from "next/image";

export default function Home() {
    return (
        <div className="mx-auto w-full h-full bg-gradient-to-r from-sky-500 to-blue-600 text-white">
            <header className="m-auto text-center h-full">
                <h1 className="text-5xl font-semibold pt-16">Gestiona aquí. Administra aquí. <br /> Sueña aquí.</h1>
                <p className="text-xl mt-10 w-[800px] m-auto">
                    Unete a la facilidad que te entrega nuestro servicio para administrar la información de tu negocio.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum iste quos, voluptas itaque consequatur rem iure odit perspiciatis vitae.
                </p>
                <button className="text-black px-8 py-2 rounded-lg font-semibold mt-10 bg-slate-100 hover:bg-white">Empezar con la prueba gratuita</button>
            </header>
            <main className="flex justify-center gap-6 items-center h-full bg-white p-4">
                <div className="flex justify-center mt-16 absolute top-2/4">
                    <Image
                        className="rounded-lg shadow-2xl"
                        src="/present.png"
                        objectFit="cover"
                        width={1000}
                        height={1000}
                        quality={100}
                        priority
                        unoptimized={true}
                        alt="Picture of the author"
                    />
                </div>
                <PriceCard
                    title='Plan Gratis'
                    content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dignissimos beatae deserunt, ipsa sapiente officiis velit qui? Neque, quibusdam delectus, eius cumque nam est cupiditate laudantium sapiente aspernatur tempore quia?'
                    price={0}
                />
                <PriceCard
                    title='Plan Mediano'
                    content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dignissimos beatae deserunt, ipsa sapiente officiis velit qui? Neque, quibusdam delectus, eius cumque nam est cupiditate laudantium sapiente aspernatur tempore quia?'
                    price={3990}
                />
                <PriceCard
                    title='Plan Premium'
                    content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dignissimos beatae deserunt, ipsa sapiente officiis velit qui? Neque, quibusdam delectus, eius cumque nam est cupiditate laudantium sapiente aspernatur tempore quia?'
                    price={4990}
                />
            </main>
            <footer className="p-4">
                <h2 className="text-center">Todos los derechos reservados - 2024</h2>
            </footer>
        </div>
    );
}
