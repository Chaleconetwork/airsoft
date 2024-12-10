import { Login } from "@/components/auth/login";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center h-full w-full bg-gray-100 bg-gradient-to-r from-gray-100 to-gray-200">
            <div className="mb-10">
                <h1 className="text-3xl m-auto font-bold">Software de Gestión</h1>
            </div>
            <Login />
        </div>
    );
}
