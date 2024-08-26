import Link from "next/link";

interface Props {
    title: string;
    content: string;
    price: number;
}

export const PriceCard: React.FC<Props> = ({ title, content, price }) => {
    return (
        <div className={`rounded-md bg-slate-100 text-black p-4 max-w-[300px] h-[400px] border-2`}>
            <div className="flex justify-between">
                <h1 className="font-semibold  text-2xl mb-4">{title}</h1>
                <div className="font-semibold text-4xl mb-4">${price}</div>
            </div>
            <h3 className="text-lg font-semibold mb-4">Beneficios</h3>
            <div className="text-md">{content}</div>
            <Link href='/'>
                <button className="font-semibold bg-slate-300 rounded-md px-4 py-2 mt-10">Conseguir</button>
            </Link>
        </div>
    )
}