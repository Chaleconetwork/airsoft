interface Props {
    value: number;
    title: string;
    percentage?: number;
    latest: string;
}

export const Kpi = ({value, title, percentage, latest}: Props) => {
    return (
        <div className="bg-white shadow-xl rounded-md p-4 w-full">
            <strong className={`${value >= 0 ? 'text-green-500' : 'text-red-500'} text-3xl`}>${value}</strong>
            <div className="flex justify-between">
                <h4 className="text-gray-500 font-medium mt-4 text-lg">{title}</h4>
                <h4 className="text-green-400 font-semibold mt-4 text-lg">{percentage} {title === 'Total de ventas' ? '': '%'}</h4>
            </div>
            <div className="border"></div>
            <h4 className="text-gray-400 mt-4 text-lg">{latest}</h4>
        </div>
    )
}