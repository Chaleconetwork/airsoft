interface Props {
    value: number;
    title: string;
    percentage: number;
    latest: string;
}

export const Barchart = ({value, title, percentage, latest}: Props) => {
    return (
        <div className="bg-white border rounded-md p-4">
            <h4 className="text-gray-500 text-lg mb-4">Estadisticas</h4>
            <div className="flex justify-between items-center">
                <strong className="text-2xl">${value}</strong>
                <h4 className="text-gray-400 text-lg">{title}</h4>
                <h4 className="text-green-400 font-semibold text-lg">{percentage}%</h4>
            </div>
            <div className="border"></div>
            <h4 className="text-gray-400 mt-4 text-lg">{latest}</h4>
        </div>
    )
}