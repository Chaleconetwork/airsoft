interface Props {
    value: number;
    title: string;
    percentage: number;
    latest: string;
}

export const Chart = ({value, title, percentage, latest}: Props) => {
    return (
        <div className="bg-white border rounded-md p-4">
            <strong className="text-3xl">${value}</strong>
            <div className="flex justify-between">
                <h4 className="text-gray-400 mt-4 text-lg">{title}</h4>
                <h4 className="text-green-400 font-semibold mt-4 text-lg">{percentage}%</h4>
            </div>
            <div className="border"></div>
            <h4 className="text-gray-400 mt-4 text-lg">{latest}</h4>
        </div>
    )
}