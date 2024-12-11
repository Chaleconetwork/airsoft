import { useAuth } from "@/context/authContext";
import { iAuth } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export const Login = () => {
    const { login, handleUsername, handleRolename } = useAuth();
    const [data, setData] = useState<iAuth>({ email: '', password: '' });
    const router = useRouter();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleClick(e: any) {
        e.preventDefault();

        // Basic form validation
        if (!data.email || !data.password) {
            return alert('Debe completar todos los campos');
        }

        const LoginbodyRequest: iAuth = {
            email: data.email,
            password: data.password
        };

        try {
            const response = await Fetch.post(`${process.env.NEXT_PUBLIC_API_URL}/Auth/Login`, LoginbodyRequest);

            if (response?.token) {
                login(response.token);
                console.log(response.username)
                handleUsername(response.username)
                handleRolename(response.rolename)
                
                router.push("/dashboard");
            } else {
                alert('Credenciales incorrectas');
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert('Error al intentar iniciar sesión');
        }
    }

    useEffect(()=>{
        // console.log(object)
    }, [])

    return (
        <div className="min-w-[30%]">
            <div className="w-full p-8 space-y-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">Inicia sesión</h2>
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
                        <div className="">
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
                            <Link href="/forgotPassword">
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
    );
};
