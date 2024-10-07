import { Filter } from "@/components/filter";

export default function Clients() {
    return (
        <div className="p">
            <h1 className="text-2xl font-bold opacity-65">Clientes</h1>
            <Filter />
            <table className="min-w-full">
                <thead className="opacity-90 bg-gray-200">
                    <tr>
                        <th className="p-2">Rut</th>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Fono</th>
                        <th className="p-2">Creado por</th>
                        <th className="p-2">Fecha creación</th>
                        {/* <th className="p-2">Fecha ultima modificación</th> */}
                        {/* <th className="p-2">Ultima modificación por</th> */}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1111111-1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">xxxx xxxx xxxx xxxx</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">xxxxx.xxxxx@gmail.com</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">+56 9 99999999</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Chaleco</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">8/25/2024</td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">8/25/2024</td> */}
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Chaleco</td> */}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}