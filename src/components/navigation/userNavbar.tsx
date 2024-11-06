import Image from "next/image";
import Link from "next/link"
import { useEffect, useState } from "react";

export const UserNavbar = () => {
    const [time, setTime] = useState({'now': '', 'seconds': '', 'minutes': '', 'hours': '', 'day': '', 'month': '', 'year': ''})

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
        <nav className="bg-white shadow-sm flex items-center justify-between gap-16 font-semibold text-sm">
            <ul className="">
                <Link href='/dashboard'>
                    <li className="flex items-center">
                        <Image
                            className="w-32"
                            src="/logoairsoft.png"
                            width={32}
                            height={32}
                            priority
                            unoptimized
                            alt="Picture of the author"
                        />
                    </li>
                </Link>
            </ul>
            <ul className="flex">
                <Link href='/'><li className="p-5 opacity-75"><strong>Fecha de hoy:</strong> {time.day}-{time.month}-{time.year}</li></Link>
                <Link href='/'><li className="p-5 opacity-75">Notificaciones</li></Link>
                <Link href='/'><li className="p-5 opacity-75">Reportes</li></Link>
                <Link href='/'><li className="p-5 opacity-75">Chaleco | Administrador</li></Link>
                <Link href='/'><li className="p-5"><span className="bg-blue-600 opacity-100 text-white rounded-2xl px-4 py-2">Cerrar sesión</span></li></Link>
            </ul>
        </nav>
    )
}