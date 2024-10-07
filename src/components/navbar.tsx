import Image from "next/image";
import Link from "next/link"
import { FaHelmetUn } from "react-icons/fa6";
import logo from "../../public/logoairsoft.png"

export const Navbar = () => {
    return (
        <nav className="flex items-center justify-center gap-16 font-semibold text-sm">
            <ul className="">
                <Link href='/dashboard'>
                    <li className="flex items-center">
                        <Image
                            className="w-28"
                            priority={true}
                            quality={100} // {number 1-100}
                            loading="eager"
                            src={logo}
                            alt="Picture of the author"
                        />
                    </li>
                </Link>
            </ul>
            <ul className="flex opacity-75">
                <Link href='/'><li className="p-5">Inicio</li></Link>
                <Link href='/'><li className="p-5">Sobre nosotros</li></Link>
                <Link href='/'><li className="p-5">Precios</li></Link>
                <Link href='/'><li className="p-5">Contactos</li></Link>
            </ul>
            <ul className="flex">
                <Link href='/login'><li className="p-5 opacity-75">Iniciar sesión</li></Link>
                <Link href='/signup'><li className="p-5"><span className="bg-blue-500 text-white rounded-full p-2.5">Crear cuenta</span></li></Link>
            </ul>
        </nav>
    )
}