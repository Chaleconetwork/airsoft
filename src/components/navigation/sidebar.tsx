import { FaUser, FaDisplay, FaUserTie, PiUsersFourFill, MdEmojiEvents, RiTeamFill } from "@/utils/icons/sidebarIcons";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { IoIosPlay } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { MdPlace } from "react-icons/md";

import { useState } from "react";

import Link from "next/link";

const links = [
    { href: '/dashboard', icon: <FaDisplay />, label: 'Panel' },
    { href: '/clients', icon: <FaUserTie />, label: 'Clientes' },
    { href: '/sales', icon: <AiFillDollarCircle />, label: 'Ventas' },
    { href: '/bills', icon: <FaMoneyBillWaveAlt />, label: 'Gastos' },
    // { href: '/events', icon: <MdEmojiEvents />, label: 'Eventos' },
    { href: '/players', icon: <PiUsersFourFill />, label: 'Jugadores' },
    { href: '/games', icon: <IoIosPlay />, label: 'Partidas' },
    { href: '/teams', icon: <RiTeamFill />, label: 'Equipos' },
    { href: '/fields', icon: <MdPlace />, label: 'Canchas' },
    { href: '/users', icon: <FaUser />, label: 'Usuarios' }
];

export const Sidebar: React.FC = () => {
    const [activeLink, setActiveLink] = useState<string>('/dashboard');

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <nav className="shadow-xl bg-white">
            <ul className="w-[250px] p-4">
                <li className="my-4 font-medium text-lg text-gray-600">Software de Gestión</li>
                <li className="border"></li>
                {links.map(({ href, icon, label }) => (
                    <Link key={href} href={href}>
                        <li
                            className={`w-full mb-1 mt-2 text-sm flex gap-4 items-center rounded-xl px-4 py-3 delay-100 duration-500
                                ${activeLink === href ? 'border-black shadow-sm shadow-gray-500 bg-gray-600 text-white font-semibold' : 'text-gray-600 font-medium'}`}
                            onClick={() => handleLinkClick(href)}
                        >
                            <strong className="text-lg">{icon}</strong> {label}
                        </li>
                    </Link>
                ))}
                <li className="border"></li>
                <Link href='/'>
                    <li className="flex gap-4 items-center text-sm rounded-xl px-4 py-3 delay-100 duration-500 text-gray-600 font-medium">
                        <strong className="text-lg"> <IoLogOut /></strong>Cerrar sesión
                    </li>
                </Link>
            </ul>
        </nav>
    );
};
