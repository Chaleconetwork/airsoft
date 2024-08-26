import Image from "next/image"
import Link from "next/link"
import { FaUser } from "react-icons/fa";
import { PiUsersFourFill } from "react-icons/pi";
import { FaDollarSign } from "react-icons/fa";
import { GiField } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { FaDisplay } from "react-icons/fa6";
import { RiTeamFill } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";

export const Sidebar = () => {
    return (
        <nav className="font-semibold bg-white border">
            <ul className="w-[250px] p-4">
                <Link href='/dashboard'><li className="w-full hover:bg-blue-200 hover:text-blue-600 my-1 flex gap-1 items-center rounded-md px-4 py-3 bg-blue-200 text-blue-600"><FaDisplay /> Panel</li></Link>
                <Link href='/clients'><li className="w-full hover:bg-blue-200 hover:text-blue-600 my-1 flex gap-1 items-center rounded-md px-4 py-3"><FaUserTie /> Clientes</li></Link>
                <Link href='/'><li className="w-full hover:bg-blue-200 hover:text-blue-600 flex gap-1 items-center rounded-md px-4 py-3"><FaDollarSign /> Ventas</li></Link>
                <Link href='/'><li className="w-full hover:bg-blue-200 hover:text-blue-600 flex gap-1 items-center rounded-md px-4 py-3"><PiUsersFourFill /> Jugadores</li></Link>
                <Link href='/'><li className="w-full hover:bg-blue-200 hover:text-blue-600 flex gap-1 items-center rounded-md px-4 py-3"><FaPlay /> Partidas</li></Link>
                <Link href='/'><li className="w-full hover:bg-blue-200 hover:text-blue-600 flex gap-1 items-center rounded-md px-4 py-3"><RiTeamFill /> Equipos</li></Link>
                <Link href='/'><li className="w-full hover:bg-blue-200 hover:text-blue-600 flex gap-1 items-center rounded-md px-4 py-3"><GiField /> Canchas</li></Link>
                <Link href='/'><li className="w-full hover:bg-blue-200 hover:text-blue-600 flex gap-1 items-center rounded-md px-4 py-3"><FaUser /> Usuarios</li></Link>
                <Link href='/'><li className="w-full hover:bg-blue-200 hover:text-blue-600 flex gap-1 items-center rounded-md px-4 py-3"><MdOutlinePayment /> Metodos de pago</li></Link>
            </ul>
        </nav>
    )
}