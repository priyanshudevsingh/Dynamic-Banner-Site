interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    type?: string;
}

export default function LabelledInput({ label, placeholder, onChange, value, type }: LabelledInputType) {
    return (
        <div className="pt-2.5">
            <label className="block mb-2 text-md font-bold text-gray-900">
                {label}
            </label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                type={type || "text"}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                required
            />
        </div>
    );
}
