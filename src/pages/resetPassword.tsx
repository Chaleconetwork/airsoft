import { useAuth } from "@/context/authContext";
import { iResetUserPassword } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ResetPassword() {
    const { isResetedPassword, setIsResetedPassword } = useAuth();
    const [data, setData] = useState<iResetUserPassword>({ email: '', newPassword: '', newPassword2: '' });
    const [message, setMessage] = useState<string>('')
    const router = useRouter();

    const [isInitialized, setIsInitialized] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleClick(e: any) {
        e.preventDefault();

        // Basic form validation
        if (!data.email || !data.newPassword || !data.newPassword2) {
            return alert('Debe completar todos los campos');
        }

        const resetUserPasswordbodyRequest: iResetUserPassword = {
            email: data.email,
            newPassword: data.newPassword,
            newPassword2: data.newPassword2
        };

        try {
            const response = await Fetch.post(`${process.env.NEXT_PUBLIC_API_URL}/Auth/ForgotPassword`, resetUserPasswordbodyRequest);

            if (response) {
                localStorage.removeItem("resetPasswordToken");
                setIsResetedPassword(false)
                setIsInitialized(false)
                setMessage('Su contraseña ha sido actualizada correctamente')
                router.push("/dashboard");
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const intervalo = setInterval(() => {
            setMessage('')
        }, 10000);

        return () => clearInterval(intervalo);
    }, [message])

    useEffect(() => {
        const resetPasswordToken = localStorage.getItem('resetPasswordToken');
        if (resetPasswordToken) {
            setIsResetedPassword(true);
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized && !isResetedPassword) {
            router.push("/");
        }
    }, [isResetedPassword, isInitialized]);

    return (
        <div className="max-w-[30%] flex items-center mx-auto h-full">
            {
                message.length > 0 &&
                <div className="absolute top-16 right-10 shadow-md max-w-[400px] p-2 rounded-md bg-green-400 text-white">
                    {message}
                </div>
            }

            <div className="w-full p-8 space-y-6 shadow-md rounded-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">Recuperar contraseña</h2>
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
                            <label htmlFor="newPassword" className="sr-only">
                                Contraseña
                            </label>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                onChange={handleChange}
                                required
                                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Nueva contraseña"
                            />
                        </div>
                        <div className="">
                            <label htmlFor="newPassword2" className="sr-only">
                                Confirmar contraseña
                            </label>
                            <input
                                id="newPassword2"
                                name="newPassword2"
                                type="password"
                                onChange={handleChange}
                                required
                                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirmar contraseña"
                            />
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
