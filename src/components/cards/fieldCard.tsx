interface Props {
    title: string;
    description: string;
}

export const FieldCard = ({ title, description }: Props) => {
    return (
        <div className="flex flex-col border h-[400px] w-auto max-w-[25%] rounded-md">
            <div className="bg-blue-500 grow rounded-t-md">
                
            </div>
            <div className="bg-black p-4 rounded-b-md">
                <h2 className="text-lg text-white">{title}</h2>
                <p className="text-lg text-white">{description}</p>
            </div>
        </div>
    )
}