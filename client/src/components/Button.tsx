interface ButtonProps {
    type: "Sign In" | "Sign Up" | "Update";
    reqFunction?: () => Promise<void>;
}

export const BlackButton = ({ type, reqFunction }: ButtonProps) => {
    return <div>
        <button onClick={reqFunction} type="button" className="mt-4 w-full py-2.5 rounded-lg text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-md">{type}</button>
    </div>
}