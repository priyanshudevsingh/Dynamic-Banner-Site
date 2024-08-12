import { useState } from "react"
import AuthHeader from "../components/AuthHeader"
import LabelledInput from "../components/LabelledInput"
import Quote from "../components/Quote"
import { SignupInput } from "@priyanshudevsingh/medium-common"
import { BlackButton } from "../components/Button"
import axios from "axios"
import { BACKEND_URL } from "../config"
import Loader from "../components/Loader"

export default function Signup() {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);

    async function sendRequest() {
        try {
            setLoading(true);
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
            const jwt = res.data.jwt;

            localStorage.setItem("token", `Bearer ${jwt}`);
            setLoading(false);
            window.location.href = "/dashboard";
        } catch (e) {
            setLoading(false);
            alert("Error signing in")
            console.log(e);
        }
    }

    if (loading) {
        return (<Loader />)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <div className="h-screen flex justify-center flex-col">
                    <div className="flex justify-center">
                        <div>
                            <AuthHeader type="signup" />

                            <div className="pt-3">
                                <LabelledInput label="Name" placeholder="Enter your name" onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        name: e.target.value
                                    })
                                }} />

                                <LabelledInput label="Email" type="email" placeholder="Enter your email" onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        email: e.target.value
                                    })
                                }} />

                                <LabelledInput label="Password" type="password" placeholder="Enter your password" onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        password: e.target.value
                                    })
                                }} />

                                <BlackButton type="Sign Up" reqFunction={sendRequest} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="invisible lg:visible">
                <Quote />
            </div>
        </div>
    )
}