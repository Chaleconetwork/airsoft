import Image from "next/image";
import Link from "next/link"
import { FaHelmetUn } from "react-icons/fa6";

export const UserNavbar = () => {
    return (
        <nav className="bg-white shadow-sm flex items-center justify-between gap-16 font-semibold text-sm">
            <ul className="">
                <Link href='/dashboard'>
                    <li className="flex items-center">
                        <Image
                            src="/logoairsoft.png"
                            width={130}
                            height={0}
                            alt="Picture of the author"
                        />
                    </li>
                </Link>
            </ul>
            <ul className="flex">
                <Link href='/'><li className="p-5 opacity-75">Reportes</li></Link>
                <Link href='/'><li className="p-5 opacity-75">8/24/2024</li></Link>
                <Link href='/'><li className="p-5 opacity-75">Chaleco | Administrador</li></Link>
                <Link href='/'><li className="p-5"><span className="bg-blue-500 opacity-100 text-white rounded-full p-2.5">Cerrar sesión</span></li></Link>
            </ul>
        </nav>
    )
}