interface Client {
    Rut: string;
    Names: string;
    TotalInverted: number;
}

interface Props {
    title: string;
    array?: Client[];  // El array es un arreglo de objetos `Client`
}

export const MinorKpi = ({ title, array }: Props) => {
    return (
        <div className="bg-white shadow-xl rounded-md p-4">
            <h4 className="text-gray-500 text-lg">{title}</h4>
            <div>
                {array?.map((client, index) => (
                    <div key={index}>
                        <p>{client.Names} - {client.TotalInverted} CLP</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
