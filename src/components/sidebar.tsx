import Image from "next/image"
import Link from "next/link"

export const Sidebar = () => {
    return (
        <nav className="bg-blue-600 text-white font-semibold">
            <ul className="w-[250px] p-4">
                <Link href='/dashboard'><li className="w-full hover:bg-white hover:text-blue-600 my-1 flex rounded-md px-4 py-2.5 bg-white text-blue-600">Panel</li></Link>
                <Link href='/'><li className="w-full hover:bg-white hover:text-blue-600 my-1 flex rounded-md px-4 py-2.5">Crecimiento</li></Link>
                <Link href='/clients'><li className="w-full hover:bg-white hover:text-blue-600 my-1 flex rounded-md px-4 py-2.5">Clientes</li></Link>
                <Link href='/'><li className="w-full hover:bg-white hover:text-blue-600 my-1 flex rounded-md px-4 py-2.5">Mejores clientes</li></Link>
                <Link href='/'><li className="w-full hover:bg-white hover:text-blue-600 my-1 flex rounded-md px-4 py-2.5">Ventas</li></Link>
                <Link href='/'><li className="w-full hover:bg-white hover:text-blue-600 my-1 flex rounded-md px-4 py-2.5">Jugadores</li></Link>
                <Link href='/'><li className="w-full hover:bg-white hover:text-blue-600 my-1 flex rounded-md px-4 py-2.5">Partidas</li></Link>
                <Link href='/'><li className="w-full hover:bg-white hover:text-blue-600 my-1 flex rounded-md px-4 py-2.5">Equipos</li></Link>
                <Link href='/'><li className="w-full hover:bg-white hover:text-blue-600 my-1 flex rounded-md px-4 py-2.5">Canchas</li></Link>
                <Link href='/'><li className="w-full hover:bg-white hover:text-blue-600 my-1 flex rounded-md px-4 py-2.5">Equipo</li></Link>
                <Link href='/'><li className="w-full hover:bg-white hover:text-blue-600 my-1 flex rounded-md px-4 py-2.5">Usuarios</li></Link>
                <Link href='/'><li className="w-full hover:bg-white hover:text-blue-600 my-1 flex rounded-md px-4 py-2.5">Metodos de pago</li></Link>
            </ul>
        </nav>
    )
}