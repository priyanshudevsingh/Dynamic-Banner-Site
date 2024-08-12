import { Link } from "react-router-dom"

export default function AuthHeader({ type }: { type: "signup" | "signin" }){
    return <div className="px-10">
        <div className="text-4xl font-extrabold">
            {type === "signup" ? "Create an account" : "Sign in to your account"}
        </div>

        <div className="text-slate-600 text-center">
            {type === "signup" ? "Already have an account?" : "Don't have an account?"}

            <Link className="pl-2 underline" to={type === "signup" ? "/signin" : "/signup"}>
                {type === "signup" ? "Login" : "Sign Up"}
            </Link>
        </div>
    </div>
}