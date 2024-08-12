import { useState } from "react"
import AuthHeader from "../components/AuthHeader"
import LabelledInput from "../components/LabelledInput"
import Quote from "../components/Quote"
import { SigninInput } from "@priyanshudevsingh/medium-common"
import { BlackButton } from "../components/Button"
import axios from "axios"
import { BACKEND_URL } from "../config"
import Loader from "../components/Loader"

export default function Signin() {
    const [postInputs, setPostInputs] = useState<SigninInput>({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);

    async function sendRequest() {
        try {
            setLoading(true);
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs);
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
                            <AuthHeader type="signin" />

                            <div className="pt-3">
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

                                <BlackButton type="Sign In" reqFunction={sendRequest} />
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