interface Props {
    title: string;
    cant: number;
    color: string;
}

export const Resume: React.FC<Props> = ({ title, cant, color }) => {
    return (
        <div className={`${color} font-semibold bg-white shadow-lg flex items-end justify-between w-[400px] h-[120px] py-3 px-4 mt-6 rounded-md`}>
            <h1 className="text-2xl">{title}</h1>
            <span className="text-4xl">{cant}</span>
        </div>
    )
}