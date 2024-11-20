import { iAuth } from "@/interfaces/types";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export const Login = () => {
    const [data, setData] = useState<iAuth>({email: '', password: ''})
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setData({ ...data, [e.target.name]: e.target.value })
        console.log(data)
    }

    const router = useRouter()
    function handleClick(e: any) {
        e.preventDefault();
        
        if (!data.email || !data.password) {
            return alert('Debe completar todos los campos');
        }

        if (data.email === 'chaleco@gmail.com' && data.password === '1234') {
            router.push('/dashboard')
            console.log(data)
            // return alert('Bienvenido');
        } else {
            return alert('Credenciales incorrectas');
        }
    }

    return (
        <div className="min-w-[30%]">
            <div className="w-full p-8 space-y-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">
                    Inicia sesión
                </h2>
                <form className="mt-8 space-y-6" method="post">
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Correo electrónico
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={handleChange}
                                required
                                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Correo electrónico"
                            />
                        </div>
                        <div className="-mt-px">
                            <label htmlFor="password" className="sr-only">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                required
                                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Contraseña"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label
                                htmlFor="remember-me"
                                className="block ml-2 text-sm text-gray-900"
                            >
                                Recuerdame
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link href="/signup">
                                <span className="font-medium text-blue-600 hover:text-blue-500">
                                    ¿Olvidaste tu contraseña?
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={handleClick}
                        >
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}