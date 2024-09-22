interface Props {
    title: string;
    money: number;
}

export const KPICard = ({ money, title }: Props) => {
    return (
        <div className="bg-white shadow-md h-[150px] rounded-md flex flex-col justify-center items-center gap-4">
            <span className="text-5xl">${money}</span>
            <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
    )
}