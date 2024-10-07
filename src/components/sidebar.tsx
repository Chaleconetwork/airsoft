import { FaUser, FaDollarSign, FaDisplay, FaUserTie, FaPlay, PiUsersFourFill, GiField, MdOutlinePayment, RiTeamFill } from "@/utils/icons/sidebarIcons";
import { useState } from "react";
import Link from "next/link";

const links = [
    { href: '/dashboard', icon: <FaDisplay />, label: 'Panel' },
    { href: '/clients', icon: <FaUserTie />, label: 'Clientes' },
    { href: '/sales', icon: <FaDollarSign />, label: 'Ventas' },
    { href: '/players', icon: <PiUsersFourFill />, label: 'Jugadores' },
    { href: '/games', icon: <FaPlay />, label: 'Partidas' },
    { href: '/teams', icon: <RiTeamFill />, label: 'Equipos' },
    { href: '/fields', icon: <GiField />, label: 'Canchas' },
    { href: '/users', icon: <FaUser />, label: 'Usuarios' }
];

export const Sidebar: React.FC = () => {
    const [activeLink, setActiveLink] = useState<string>('/dashboard');

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <nav className="font-semibold bg-white border">
            <ul className="w-[250px] p-4">
                {links.map(({ href, icon, label }) => (
                    <Link key={href} href={href}>
                        <li
                            className={`w-full my-1 flex gap-1 items-center rounded-md px-4 py-3 ${activeLink === href ? 'bg-blue-200 text-blue-600' : ''}`}
                            onClick={() => handleLinkClick(href)}
                        >
                            {icon} {label}
                        </li>
                    </Link>
                ))}
            </ul>
        </nav>
    );
};
