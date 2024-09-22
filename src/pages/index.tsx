import { PriceCard } from "@/components/prices/priceCard";
import Image from "next/image";

export default function Home() {
    return (
        <div className="mx-auto w-full h-full bg-gradient-to-r from-sky-500 to-blue-600 text-white">
            <header className="m-auto text-center h-full">
                <h1 className="text-5xl font-semibold pt-16">Airsoft</h1>
            </header>
            <main className="flex justify-center gap-6 items-center h-full bg-white p-4">
               
            </main>
            <footer className="p-4">
                <h2 className="text-center">Todos los derechos reservados - 2024</h2>
            </footer>
        </div>
    );
}
