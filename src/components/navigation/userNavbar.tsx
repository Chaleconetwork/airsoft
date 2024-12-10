import { IoIosNotifications } from "react-icons/io";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"
import { useAuth } from "@/context/authContext";

export const UserNavbar = () => {
    const [time, setTime] = useState({'now': '', 'seconds': '', 'minutes': '', 'hours': '', 'day': '', 'month': '', 'year': ''})
    const { username, rolename } = useAuth();

    useEffect(() => {
        const now = new Date();
        const seconds = now.getSeconds()
        const minutes = now.getMinutes()
        const hours = now.getHours();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        setTime({
            'now': now.toString(),
            'seconds': seconds < 10 ? 0 + seconds.toString() : seconds.toString(),
            'minutes':  minutes < 10 ? 0 + minutes.toString() : minutes.toString(),
            'hours': hours.toString(),
            'day': day < 10 ? 0 + day.toString() : day.toString(),
            'month': month < 10 ? 0 + month.toString() : month.toString(),
            'year': year.toString()
        })
    }, [])

    return (
        <nav className="bg-white shadow-md flex items-center justify-between gap-16 font-semibold text-sm">
            <ul className="">
                <Link href='/dashboard'>
                    <li className="flex items-center">
                        <Image
                            className="w-32"
                            src="/logoairsoft2.png"
                            width={32}
                            height={32}
                            priority
                            unoptimized
                            alt="Picture of the author"
                        />
                    </li>
                </Link>
            </ul>
            <ul className="flex text-gray-600">
                <Link href='/'><li className="p-5 opacity-75">{time.day} de Noviembre</li></Link>
                {/* <Link href='/'><li className="p-5 opacity-75 text-xl"><IoIosNotifications /></li></Link> */}
                {/* <Link href='/'><li className="p-5 opacity-75">Reportes</li></Link> */}
                <Link href='/'><li className="p-5 opacity-75">{username}</li></Link>
                <Link href='/'><li className="p-5 opacity-75">{rolename}</li></Link>
                <Link href='/'><li className="p-5 text-xl"><FaHouseChimneyUser /></li></Link>
            </ul>
        </nav>
    )
}