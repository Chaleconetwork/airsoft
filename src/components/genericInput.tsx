interface Props {
    label: string;
    name: string;
    type: string;
    // htmlFor: string;
    required?: boolean;
    value?: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    options?: { label: string; value: number | string }[]; // Opcional para el select
}

export const GenericInput = ({ label, name, type, value, handleChange, options, required }: Props) => {
    return (
        <div>
            <label className="block" htmlFor=''>{label}</label>
            {options ? (
                <select
                    onChange={handleChange}
                    name={name}
                    className="p-1.5 outline-none border w-full rounded-md"
                    value={value}
                    required={required}
                >
                    <option value="">Selecciona una opción</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    onChange={handleChange}
                    name={name}
                    type={type}
                    className="p-1.5 outline-none border w-full rounded-md"
                    placeholder="Campo obligatorio"
                    value={value}
                />
            )}
        </div>
    );
};
