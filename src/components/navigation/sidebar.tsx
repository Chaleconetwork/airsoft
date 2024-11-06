import { FaUser, FaDollarSign, FaDisplay, FaUserTie, FaPlay, PiUsersFourFill, TbSoccerField, MdEmojiEvents, RiTeamFill } from "@/utils/icons/sidebarIcons";
import { useState } from "react";
import Link from "next/link";

const links = [
    { href: '/dashboard', icon: <FaDisplay />, label: 'Panel' },
    { href: '/clients', icon: <FaUserTie />, label: 'Clientes' },
    { href: '/sales', icon: <FaDollarSign />, label: 'Ventas' },
    { href: '/events', icon: <MdEmojiEvents />, label: 'Eventos' },
    { href: '/players', icon: <PiUsersFourFill />, label: 'Jugadores' },
    { href: '/games', icon: <FaPlay />, label: 'Partidas' },
    { href: '/teams', icon: <RiTeamFill />, label: 'Equipos' },
    { href: '/fields', icon: <TbSoccerField />, label: 'Canchas' },
    { href: '/users', icon: <FaUser />, label: 'Usuarios' }
];

export const Sidebar: React.FC = () => {
    const [activeLink, setActiveLink] = useState<string>('/dashboard');

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <nav className="bg-white border">
            <ul className="w-[250px] p-4">
                <li className="my-4 font-semibold text-lg">Software de Gestión</li>
                <li className="border"></li>
                {links.map(({ href, icon, label }) => (
                    <Link key={href} href={href}>
                        <li
                            className={`w-full font-semibold my-2 flex text-sm gap-4 items-center rounded-md px-4 py-3 ${activeLink === href ? 'bg-blue-600 text-white' : ''}`}
                            onClick={() => handleLinkClick(href)}
                        >
                            {icon} {label}
                        </li>
                    </Link>
                ))}
                <li className="border"></li>
            </ul>
        </nav>
    );
};
